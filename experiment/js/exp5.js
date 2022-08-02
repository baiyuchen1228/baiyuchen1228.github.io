var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID
var meter1_mode = 0;
var meter2_mode = 0;
var meter_mode = [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9];

const cur1 = document.querySelector("#powersupply1");
const vol1 = document.querySelector("#powersupply2");
const cur2 = document.querySelector("#powersupply3");
const vol2 = document.querySelector("#powersupply4");
const meter1_value = document.querySelector("#multimeter1_3");
const meter2_value = document.querySelector("#multimeter2_3");

const addcurrent1 = document.querySelector("#powersupply5");
const addvoltage1 = document.querySelector("#powersupply7");
const addcurrent2 = document.querySelector("#powersupply9");
const addvoltage2 = document.querySelector("#powersupply11");
const meter1_clockwise = document.querySelector("#multimeter1_1");
const meter2_clockwise = document.querySelector("#multimeter2_1");

const deccurrent1 = document.querySelector("#powersupply6");
const decvoltage1 = document.querySelector("#powersupply8");
const deccurrent2 = document.querySelector("#powersupply10");
const decvoltage2 = document.querySelector("#powersupply12");
const meter1_counterclockwise = document.querySelector("#multimeter1_2");
const meter2_counterclockwise = document.querySelector("#multimeter2_2");

var current1 = 0, voltage1 = 0, current2 = 0, voltage2 = 0, power = 0;

// 顯示或隱藏子選單
function switchMenu(theMainMenu, theSubMenu, theEvent) {
    var SubMenu = document.getElementById(theSubMenu);
    if (SubMenu.style.display == 'none') { // 顯示子選單
        SubMenu.style.minWidth = theMainMenu.clientWidth; // 讓子選單的最小寬度與主選單相同 (僅為了美觀)
        SubMenu.style.display = 'block';
        hideMenu(); // 隱藏子選單
        VisibleMenu = theSubMenu;
    }
    else { // 隱藏子選單
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

document.getElementById("powersupply14").onclick = function () {
    if (power == 0) {
        cur1.innerHTML = current1.toFixed(2);
        cur2.innerHTML = current2.toFixed(2);
        vol1.innerHTML = voltage1.toFixed(1);
        vol2.innerHTML = voltage2.toFixed(1);
        power = 1;
    } else {
        current1 = current2 = 0;
        voltage1 = voltage2 = 0;
        cur1.innerHTML = "";
        cur2.innerHTML = "";
        vol1.innerHTML = "";
        vol2.innerHTML = "";
        power = 0;
    }
}

addcurrent1.onclick = function () {
    if (power == 1) {
        current1 += 0.01;
        cur1.innerHTML = current1.toFixed(2);
    }
}

addvoltage1.onclick = function () {
    if (power == 1) {
        voltage1 += 0.1;
        vol1.innerHTML = voltage1.toFixed(1);
    }
}

addcurrent2.onclick = function () {
    if (power == 1) {
        current2 += 0.01;
        cur2.innerHTML = current2.toFixed(2);
    }
}

addvoltage2.onclick = function () {
    if (power == 1) {
        voltage2 += 0.1;
        vol2.innerHTML = voltage2.toFixed(1);
    }
}

deccurrent1.onclick = function () {
    if (power == 1) {
        current1 -= 0.01;
        if (current1 < 0) {
            current1 = 0;
        }
        cur1.innerHTML = current1.toFixed(2);
    }
}

decvoltage1.onclick = function () {
    if (power == 1) {
        voltage1 -= 0.1;
        if (voltage1 < 0) {
            voltage1 = 0;
        }
        vol1.innerHTML = voltage1.toFixed(1);
    }
}

deccurrent2.onclick = function () {
    if (power == 1) {
        current2 -= 0.01;
        if (current2 < 0) {
            current2 = 0;
        }
        cur2.innerHTML = current2.toFixed(2);
    }
}

decvoltage2.onclick = function () {
    if (power == 1) {
        voltage2 -= 0.1;
        if (voltage2 < 0) {
            voltage2 = 0;
        }
        vol2.innerHTML = voltage2.toFixed(1);
    }
}

meter1_clockwise.onclick = function () {
    var last_mode = meter1_mode;
    meter1_mode = (meter1_mode + 1 + 6) % 16 - 6;
    $("#multimeter1").removeClass('multimeter-bg'+last_mode).addClass('multimeter-bg'+meter1_mode);
}

meter1_counterclockwise.onclick = function () {
    var last_mode = meter1_mode;
    meter1_mode = (meter1_mode - 1 + 6 + 16) % 16 - 6;
    $("#multimeter1").removeClass('multimeter-bg'+last_mode).addClass('multimeter-bg'+meter1_mode);
}

meter2_clockwise.onclick = function () {
    var last_mode = meter2_mode;
    meter2_mode = (meter2_mode + 1 + 6) % 16 - 6;
    $("#multimeter2").removeClass('multimeter-bg'+last_mode).addClass('multimeter-bg'+meter2_mode);
}

meter2_counterclockwise.onclick = function () {
    var last_mode = meter2_mode;
    meter2_mode = (meter2_mode - 1 + 6 + 16) % 16 - 6;
    $("#multimeter2").removeClass('multimeter-bg'+last_mode).addClass('multimeter-bg'+meter2_mode);
}
