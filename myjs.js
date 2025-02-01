const div = document.querySelector('examples');
const list = div.children;
for (let i = 0; i < list.length; i++) {
	list[i].onmouseover = function () {
		this.children[1].style.display = 'block';
	};
	list[i].onmouseout = function () {
		this.children[1].style.display = 'none';
	};
}
