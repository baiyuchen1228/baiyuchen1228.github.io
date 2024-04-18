// 顯示或隱藏子選單
function switchMenu(theMainMenu, theSubMenu, theEvent) {
	var SubMenu = document.getElementById(theSubMenu);
	if (SubMenu.style.display == 'none') {
		// 顯示子選單
		SubMenu.style.minWidth = theMainMenu.clientWidth; // 讓子選單的最小寬度與主選單相同 (僅為了美觀)
		SubMenu.style.display = 'block';
		hideMenu(); // 隱藏子選單
		VisibleMenu = theSubMenu;
	} else {
		// 隱藏子選單
		if (theEvent != 'MouseOver' || VisibleMenu != theSubMenu) {
			SubMenu.style.display = 'none';
			VisibleMenu = '';
		}
	}
}

// 隱藏子選單
function hideMenu() {
	if (VisibleMenu != '') {
		document.getElementById(VisibleMenu).style.display = 'none';
	}
	VisibleMenu = '';
}

// 當按到非按鈕的地方，隱藏選單
document.addEventListener('click', (evt) => {
	const menuObject1 = document.getElementById('menu1');
	const menuObject2 = document.getElementById('menu2');
	let clickedObject = evt.target;
	if (menuObject1 != clickedObject && menuObject2 != clickedObject) {
		hideMenu();
	}
});
