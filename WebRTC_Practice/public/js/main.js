const { answer } = require('../../event');

let peer; // RTCPeerConnection
let cacheStream; // MediaStreamTrack
let socket;
let dataChannel;

const offerOptions = {
	offerToReceiveAudio: 1,
	offerToReceiveVideo: 1,
};

// Media config
const mediaConstraints = {
	audio: True,
	video: {
		aspectRatio: {
			ideal: 1.333333, // 3:2 aspect is preferred
		},
	},
};

// core functions
function connection() {
	socket = io.connect('/');

	// Listening for joining a room (joinRoom event)
	socket.emit('joinRoom', { username: 'test' });

	// Socket events
	socket.on('newUser', (data) => {
		const message = 'Welcome to Socket.IO Chat – ';
		console.log(message);
		console.log(data);
	});

	socket.on('userLeave', (data) => {
		const message = 'Someone Leave ~';
		console.log(message);
		console.log(data);
	});

	socket.on('disconnect', () => {
		console.log('you have been disconnected');
	});

	// for peer to peer communicate
	socket.on('offer', handleSDPOffer); // SDP offer
	socket.on('answer', handleSDPAnswer); // SDP answer
	socket.on('icecandidate', handleNewIceCandidate); //ICE
	return socket;
}
function closeDataChannels(channel) {
	channel.close();
}

// 開啟 WebRTC 連線
async function calling() {
	try {
		if (peer) {
			alert('你已經建立連線!');
		} else {
			createPeerConnection(); // 建立 RTCPeerConnection

			await addStreamProcess(); // 加入多媒體數據到 RTCPeerConnection instanc
		}
	} catch (error) {
		console.log(`Error ${error.name}: ${error.message}`);
	}
}

function closing() {
	// Disconnect all our event listeners; we don't want stray events
	// to interfere with the hangup while it's ongoing.
	console.log('Closing connection call');
	if (!peer) return;

	// 1. 移除事件監聽
	peer.onicecandidate = null;
	peer.ontrack = null;
	peer.onnegotiationneeded = null;
	peer.onconnectionstatechange = null;
	peer.oniceconnectionstatechange = null;
	peer.onicegatheringstatechange = null;
	peer.onsignalingstatechange = null;

	// 2. 停止所有在connection中的多媒體信息
	peer.getSenders().forEach((sender) => {
		peer.removeTrack(sender);
	});

	// 3. 暫停video播放，並將儲存在src裡的 MediaStreamTracks 依序停止
	const localVideo = document.getElementById('localVideo');
	if (localVideo.srcObject) {
		localVideo.pause();
		localVideo.srcObject.getTracks().forEach((track) => {
			track.stop();
		});
	}

	// 4. cleanup： 關閉RTCPeerConnection連線並釋放記憶體
	peer.close();
	peer = null;
	cacheStream = null;
	dataChannel = null;
}
// core functions end

// utils
function createPeerConnection() {
	peer = new RTCPeerConnection();
	peer.onicecandidate = handleIceCandidate; // 有新的 ICE candidate 時觸發
	peer.ontrack = handleRemoteStream; // connection中發現新的 MediaStreamTrack 時觸發，處理接收
	peer.onnegotiationneeded = handleNegotiationNeeded; // 每當 RTCPeerConnection 要進行會話溝通(連線)時觸發，處理create Offer
	peer.onconnectionstatechange = handleConnectionStateChange;
	peer.oniceconnectionstatechange = handleICEConnectionStateChange;
	peer.onicegatheringstatechange = handleICEGatheringStateChange; // gatherinh:搜尋中;complete:結束搜尋
	peer.onsignalingstatechange = handleSignalingStateChange; // signaling 的狀態管理 stable:可以連線;have-local-offer;have-remote-offer
}

// local 創建和傳遞 Offer
async function handleNegotiationNeeded() {
	console.log('*** handleNegotiationNeeded fired!');
	try {
		console.log('createOffer ...');
		console.log('setLocalDescription ...');
		await peer.setLocalDescription(await peer.createOffer(offerOptions));
		console.log('signaling offer ...');
		sendSDPBySignaling('offer', peer.localDescription);
	} catch (error) {
		console.log(`Failed to create session description: ${error.toString()}`);
		console.log(`Error ${error.name}: ${error.message}`);
	}
}

function handleSignalingStateChange() {
	console.log('*** WebRTC signaling 狀態改變: ' + peer.signalingState);
}

function handleConnectionStateChange() {
	console.log('*** WebRTC connectionState 狀態改變: ' + peer.connectionState);

	switch (peer.connectionState) {
		case 'closed':
		case 'failed':
		case 'disconnected':
			closing();
			break;
	}
}

function handleICEConnectionStateChange() {
	console.log('*** ICE agent連線狀態改變: ' + peer.iceConnectionState);

	switch (peer.iceConnectionState) {
		case 'closed':
		case 'failed':
		case 'disconnected':
			closing();
			break;
	}
}

function handleICEGatheringStateChange() {
	console.log('*** ICE gathering state changed to: ' + peer.iceGatheringState);
}

// 傳送 icecandidate
function handleIceCandidate(event) {
	socket.emit('icecandidate', event.candidate);
}

// 獲取新的多媒體數據
function handleRemoteStream(event) {
	const remoteVideo = document.getElementById('remoteVideo');
	if (remoteVideo.srcObject !== event.streams[0]) {
		remoteVideo.srcObject = event.streams[0];
	}
}

async function getUserStream() {
	console.log('getUserMedia ...');
	if ('mediaDevices' in navigator) {
		const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
		cacheStream = stream;

		const localVideo = document.getElementById('localVideo');
		localVideo.srcObject = cacheStream;
	}
}

// 加入多媒體數據到 RTCPeerConnection instance
async function addStreamProcess() {
	let errMsg = '';
	try {
		await getUserStream();
	} catch (error) {
		errMsg = 'getUserStream error ===> ' + error.toString();
		throw new Error(errMsg);
	}

	try {
		// RTCPeerConnection.addTrack => 加入MediaStreamTrack
		cacheStream.getTracks().forEach((track) => peer.addTrack(track, cacheStream));
	} catch (error) {
		errMsg = 'Peer addTransceiver error ===> ' + error.toString();
		throw new Error(errMsg);
	}
}

// 接收 SDP Offer
async function handleSDPOffer(desc) {
	console.log('*** 收到遠端送來的offer');
	try {
		if (!peer) {
			createPeerConnection(); // create RTCPeerConnection instance
		}

		console.log('setRemoteDescription ...');
		await peer.setRemoteDescription(desc);

		if (!cacheStream) {
			await addStreamProcess(); // getUserMedia & addTrack
		}

		await createAnswer();
	} catch (error) {
		console.log(`Failed to create session description: ${error.toString()}`);
		console.log(`Error ${error.name}: ${error.message}`);
	}
}

// 接收 SDP answer
async function handleSDPAnswer(desc) {
	console.log('*** 遠端接受我們的offer並發送answer回來');
	try {
		console.log('setRemoteDescription ...');
		await peer.setRemoteDescription(desc);
	} catch (error) {
		console.log(`Error ${error.name}: ${error.message}`);
	}
}
async function createAnswer() {
	try {
		console.log('createAnswer ...');
		const answer = await peer.createAnswer();
		console.log('setLocalDescription ...');
		await peer.setLocalDescription(answer);
		console.log('signaling answer ...');
		sendSDPBySignaling('answer', answer);
	} catch (error) {
		errMsg = 'Create Answer error ===> ' + error.toString();
		throw new Error(errMsg);
	}
}

//接收 ICE candidate
async function handleNewIceCandidate(candidate) {
	console.log(`*** 加入新取得的 ICE candidate: ${JSON.stringify(candidate)}`);
	try {
		await peer.addIceCandidate(candidate);
	} catch (error) {
		console.log(`Failed to add ICE: ${error.toString()}`);
	}
}

function sendSDPBySignaling(event, sdp) {
	socket.emit(event, sdp);
}

// utils end
