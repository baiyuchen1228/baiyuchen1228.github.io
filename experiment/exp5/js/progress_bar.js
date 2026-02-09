let progress_bar_i = 0;
function move() {
	if (progress_bar_i === 0) {
		progress_bar_i = 1;
		const elem = document.getElementById('myBar');
		let width = 0;
		const id = setInterval(frame, 10);
		function frame() {
			if (width >= 100) {
				clearInterval(id);
				progress_bar_i = 0;
				elem.style.width = '0%';
			} else {
				width++;
				elem.style.width = `${width}%`;
			}
		}
	}
}
