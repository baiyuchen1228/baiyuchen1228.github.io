let activeMenuId = '';

// 顯示或隱藏子選單
function switchMenu(theMainMenu, theSubMenu, theEvent) {
	const subMenu = document.getElementById(theSubMenu);
	if (subMenu.style.display === 'none') {
		// 顯示子選單
		hideMenu(); // 先關掉目前已開啟的子選單
		subMenu.style.minWidth = theMainMenu.clientWidth; // 讓子選單的最小寬度與主選單相同 (僅為了美觀)
		subMenu.style.display = 'block';
		activeMenuId = theSubMenu;
	} else {
		// 隱藏子選單
		if (theEvent !== 'MouseOver' || activeMenuId !== theSubMenu) {
			subMenu.style.display = 'none';
			activeMenuId = '';
		}
	}
}

// 隱藏子選單
function hideMenu() {
	if (activeMenuId !== '') {
		document.getElementById(activeMenuId).style.display = 'none';
	}
	activeMenuId = '';
}

// 當按到非按鈕的地方，隱藏選單
document.addEventListener('click', (evt) => {
	const menuObject1 = document.getElementById('menu1');
	const menuObject2 = document.getElementById('menu2');
	const clickedObject = evt.target;
	const clickedInsideMenu1 = menuObject1 && menuObject1.contains(clickedObject);
	const clickedInsideMenu2 = menuObject2 && menuObject2.contains(clickedObject);
	if (!clickedInsideMenu1 && !clickedInsideMenu2) {
		hideMenu();
	}
});
