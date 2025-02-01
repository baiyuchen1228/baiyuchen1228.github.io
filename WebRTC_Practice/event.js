const Room1 = 'general';
const users = {
	[Room1]: {},
};

function joinRoom(socket) {
	return ({ username, room = Room1 }) => {
		socket.join(room, () => {
			// push user for the suitable room
			users[room][socket.client.id] = { username, id: socket.client.id };
			// Notify all the users in the same room
			socket.broadcast.in(room).emit('newUser', users[room]);
		});
	};
}

function leaveRoom(socket) {
	return ({ room, username }) => {
		socket.leave(room, () => {
			const usersRoom = users[room];
			delete users[room][socket.client.id];
			// usersRoom = usersRoom.filter((user) => (user.username !== username)) // delete user from the array
			socket.broadcast.in(room).emit('userLeave', usersRoom); // To all the users in the same room
		});
	};
}

function offer(socket) {
	return ({ room, offer }) => {
		console.log('switch offer');
		socket.broadcast.in(room).emit('offer', offer);
	};
}

function answer(socket) {
	return ({ room, answer }) => {
		console.log('switch answer');
		socket.broadcast.in(room).emit('answer', answer);
	};
}

function icecandidate(socket) {
	return ({ room, candidate }) => {
		console.log('switch icecandidate');
		socket.broadcast.in(room).emit('icecandidate', candidate);
	};
}

module.exports = {
	joinRoom,
	leaveRoom,
	offer,
	answer,
	icecandidate,
};
