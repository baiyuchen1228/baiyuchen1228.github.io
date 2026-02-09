(function (global) {
	const RELOAD_MESSAGE = '確定要清除全部嗎？\nAre you sure to reload？';
	const LEAVE_MESSAGE = '確定要離開?';
	const STUDENT_ID_MESSAGE = '學號輸入錯誤。\nStudent Id number error.';

	function handleKeyPress(e, actions) {
		const evtobj = global.window && global.window.event ? event : e;
		if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
			actions.undo();
		}
		if (evtobj.keyCode === 65) {
			actions.toggleAlligatorButton();
		}
		if (evtobj.keyCode === 68) {
			actions.toggleDelButton();
		}
	}

	function runReload(options) {
		const confirmFn = options.confirmFn || global.confirm;
		const iterations = options.iterations || 100;
		if (!confirmFn(RELOAD_MESSAGE)) {
			return false;
		}
		for (let i = 0; i < iterations; i += 1) {
			options.undo();
		}
		return true;
	}

	function makeBeforeUnloadHandler(confirmFn) {
		return () => confirmFn(LEAVE_MESSAGE);
	}

	function runStart(options) {
		const id = Number.parseInt(options.$('#id1')[0].value, 10);
		if (Number.isNaN(id)) {
			options.alertFn(STUDENT_ID_MESSAGE);
			return false;
		}

		if (options.setSwp) {
			options.setSwp(0.04 * (options.randomIntFn(10) - 5) + 1);
		}
		options.setStartBool(true);

		const date = new Date();
		const time = `${String(date.getFullYear())}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
		options.$('#time1').text(time);
		options.$('#name2').text(options.$('#name1')[0].value);
		options.$('#id2').text(options.$('#id1')[0].value);
		options.$('#class2').text(options.$('#class1')[0].value);
		options.$('#name1').css('display', 'none');
		options.$('#id1').css('display', 'none');
		options.$('#class1').css('display', 'none');
		options.$('#submitbuttom').css('display', 'none');

		if (options.afterStart) {
			options.afterStart();
		}
		return true;
	}

	function setErrorMessage(selector, message, append = false) {
		const node = global.document.querySelector(selector);
		if (!node) {
			return;
		}
		if (append) {
			node.innerHTML = `${node.innerHTML}<br>${message}`;
			return;
		}
		node.innerHTML = message;
	}

	function pow(a, x) {
		let tmp = 1;
		if (x > 0) {
			for (let i = 0; i < x; i += 1) {
				tmp *= a;
			}
		} else {
			x *= -1;
			for (let i = 0; i < x; i += 1) {
				tmp /= a;
			}
		}
		return tmp;
	}

	function randomInt(max) {
		return Math.floor(Math.random() * max);
	}

	global.RlcBootstrap = {
		handleKeyPress,
		runReload,
		makeBeforeUnloadHandler,
		runStart,
		setErrorMessage,
		pow,
		randomInt,
	};
}(globalThis));
