var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID
var meter1_mode = 0;
var meter2_mode = 0;
const meter_mode = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const colorlist = ['Red', 'DeepSkyBlue', 'Brown', 'DarkRed', 'Blue', 'Magenta', 'Cyan', 'Lime', 'Orange', 'Purple', 'SkyBlue', 'Indigo', 'Fuchsia', 'DarkCyan', 'Olive', 'SeaGreen', 'Goldenrod']
const meter_Mode = ['200歐姆','2K歐姆','20K歐姆','200K歐姆','2M歐姆','20M歐姆','關機','600交流V','200交流V','600直流V','200直流V','20直流V','2直流V','200m直流A','20m直流A','2m直流A']
var colorNo = 0;

var powerOutput = false;
const power_output = document.querySelector('#powersupply13');
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


var current1 = 0, voltage1 = 0, current2 = 0, voltage2 = 0, power = 0, powersupplyOutputStatus = 0;

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
        powersupplyOutputStatus = 0;
    }
}
document.getElementById("powersupply13").onclick = function () {
    if (power == 1 && powersupplyOutputStatus == 0) {
        powersupplyOutputStatus = 1;
        console.log("output on!");
    } else {
        powersupplyOutputStatus = 0;
        console.log("power off!");
    }
}


power_output.onclick = function () {
    if(powerOutput != true){
        $("#powersupply13").css("background-color", "Lightgreen");
        powerOutput = true;
    }
    else{
        $("#powersupply13").css("background-color", "White");
        powerOutput = false;
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
    $("#multimeter1").removeClass('multimeter-bg' + last_mode).addClass('multimeter-bg' + meter1_mode);
    $("#multimeter1_7").text('狀態:'+meter_Mode[meter1_mode+6]);
}

meter1_counterclockwise.onclick = function () {
    var last_mode = meter1_mode;
    meter1_mode = (meter1_mode - 1 + 6 + 16) % 16 - 6;
    $("#multimeter1").removeClass('multimeter-bg' + last_mode).addClass('multimeter-bg' + meter1_mode);
    $("#multimeter1_7").text('狀態:'+meter_Mode[meter1_mode+6]);
}

meter2_clockwise.onclick = function () {
    var last_mode = meter2_mode;
    meter2_mode = (meter2_mode + 1 + 6) % 16 - 6;
    $("#multimeter2").removeClass('multimeter-bg' + last_mode).addClass('multimeter-bg' + meter2_mode);
    $("#multimeter2_7").text('狀態:'+meter_Mode[meter2_mode+6]);
}

meter2_counterclockwise.onclick = function () {
    var last_mode = meter2_mode;
    meter2_mode = (meter2_mode - 1 + 6 + 16) % 16 - 6;
    $("#multimeter2").removeClass('multimeter-bg' + last_mode).addClass('multimeter-bg' + meter2_mode);
    $("#multimeter2_7").text('狀態:'+meter_Mode[meter2_mode+6]);
}


const meter1_drowline1 = document.querySelector("#multimeter1_4");
const meter1_drowline2 = document.querySelector("#multimeter1_5");
const meter1_drowline3 = document.querySelector("#multimeter1_6");
const meter2_drowline1 = document.querySelector("#multimeter2_4");
const meter2_drowline2 = document.querySelector("#multimeter2_5");
const meter2_drowline3 = document.querySelector("#multimeter2_6");
const power_drowline1 = document.querySelector("#powersupply15");
const power_drowline2 = document.querySelector("#powersupply16");
const power_drowline3 = document.querySelector("#powersupply17");
const power_drowline4 = document.querySelector("#powersupply18");

var x1, x2, y1, y2, drawline = true;
var AlligatorX1, AlligatorY1;
var finalOutput;
var drawWire = 0;
var wireInitial;
var drawResistance = 0;
var resistanceInitial;
var drawAlligator = 0;
var AlligatorInitial;
var drawInductance = 0;
var inductanceInitial;
var drawCapacitance = 0;;
var CapacitanceInitial;

var chipNo = 1;
var wireNo = 1;
var resistanceNo = 1;
var inductanceNo = 1;
var alligatorNo = 1;
var capacitanceNo = 1;
var deletemode = 0;
var delIni;


power_drowline1.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 1285;
        AlligatorY1 = 545;
    }
}
power_drowline2.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 1250;
        AlligatorY1 = 545;
    }
}
power_drowline3.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 1385;
        AlligatorY1 = 545;
    }
}
power_drowline4.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 1350;
        AlligatorY1 = 545;
    }
}
meter1_drowline1.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 85;
        AlligatorY1 = 565;
    }
}
meter1_drowline2.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 145;
        AlligatorY1 = 565;
    }
}
meter1_drowline3.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 205;
        AlligatorY1 = 565;
    }
}
meter2_drowline1.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 345;
        AlligatorY1 = 425;
    }
}
meter2_drowline2.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 405;
        AlligatorY1 = 425;
    }
}
meter2_drowline3.onmousedown = function (e) {
    if (drawAlligator) {
        AlligatorX1 = 465;
        AlligatorY1 = 425;
    }
}
function approx_x(x) {
    return (Math.floor(x / 20) * 20 + 5);
}

$("#container").mousedown(function (e) {
    if (drawWire == 1) {
        wireInitial = e;
    }
    if (drawResistance == 1) {
        resistanceInitial = e;
    }
    if (drawInductance == 1) {
        inductanceInitial = e;
    }
    if (deletemode == 1) {
        delIni = e;
    }
    if (drawCapacitance == 1){
        CapacitanceInitial = e;
    }
});

function parseSVG(s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}

$("#container").mouseup(function (e) {
    if (drawWire == 1) {
        var wireFinal = e;

        x1 = approx_x(wireInitial.pageX);
        y1 = approx_x(wireInitial.pageY);
        x2 = approx_x(wireFinal.pageX);
        y2 = approx_x(wireFinal.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)It is meaningless to insert both the ends of wire to the same point.");
            return;
        }
        if (x2 < 25 || x2 > 465 || y2 < 45 || y2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (x1 < 25 || x1 > 465 || y1 < 45 || y1 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        document.getElementById('svgline').appendChild(parseSVG('<line id=wire' + wireNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
        wireNo++;
        colorNo = (colorNo + 1) % colorlist.length;
    }
    if (drawResistance == 1) {
        var resistanceFinal = e;

        x1 = approx_x(resistanceInitial.pageX);
        y1 = approx_x(resistanceInitial.pageY);
        x2 = approx_x(resistanceFinal.pageX);
        y2 = approx_x(resistanceFinal.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)Can't insert both the legs of resistor to the same point.");
            return;
        }
        if (x2 < 25 || x2 > 465 || y2 < 45 || y2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (x1 < 25 || x1 > 465 || y1 < 45 || y1 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        var ohms = prompt("(輸入電阻)Enter the value of Resistance in ohms", "Resistance in Ohms");
        ohms = parseFloat(ohms);
        if (isNaN(ohms) || ohms == '' || ohms <= 0) {
            alert("Invalid value of resistance!");
            return;
        }
        document.getElementById('svgline').appendChild(parseSVG('<line dataohm="' + ohms + '"id=resistance' + resistanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ohms + 'ohms</title></line>'));
        //to draw the box of the resistor
        var centerX = x1 - (x1 - x2) / 2;
        var centerY = y1 - (y1 - y2) / 2;
        var slope = Math.atan((y2 - y1) / (x2 - x1));
        var rectX1 = centerX - 5 * Math.sin(slope) + 10 * Math.cos(slope);
        var rectY1 = centerY + 5 * Math.cos(slope) + 10 * Math.sin(slope);
        var rectX2 = centerX + 10 * Math.cos(slope) + 5 * Math.sin(slope);
        var rectY2 = centerY + 10 * Math.sin(slope) - 5 * Math.cos(slope);
        var rectX3 = centerX + 5 * Math.sin(slope) - 10 * Math.cos(slope);
        var rectY3 = centerY - 5 * Math.cos(slope) - 10 * Math.sin(slope);
        var rectX4 = centerX - 10 * Math.cos(slope) - 5 * Math.sin(slope);
        var rectY4 = centerY - 10 * Math.sin(slope) + 5 * Math.cos(slope);
        document.getElementById('svgline').appendChild(parseSVG('<polygon id=resistanceBox' + resistanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:blue; stroke:lime; stroke-width:1"><title>' + ohms + 'ohms</title></polygon>'));
        resistanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
    }
    if (drawInductance == 1) {
        var inductanceFinal = e;

        x1 = approx_x(inductanceInitial.pageX);
        y1 = approx_x(inductanceInitial.pageY);
        x2 = approx_x(inductanceFinal.pageX);
        y2 = approx_x(inductanceFinal.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)Can't insert both the legs of inductor to the same point.");
            return;
        }
        if (x2 < 25 || x2 > 465 || y2 < 45 || y2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (x1 < 25 || x1 > 465 || y1 < 45 || y1 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        var mhos = prompt("(輸入電感單位)Enter the value of Inductance in mhos", "Inductance in mhos");
        mhos = parseFloat(mhos);
        if (isNaN(mhos) || mhos == '' || mhos <= 0) {
            alert("(非正常數值)Invalid value of inductance!");
            return;
        }
        document.getElementById('svgline').appendChild(parseSVG('<line datamho="' + mhos + '"id=inductance' + inductanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + mhos + 'mhos</title></line>'));
        //to draw the box of the resistor
        var centerX = x1 - (x1 - x2) / 2;
        var centerY = y1 - (y1 - y2) / 2;
        var slope = Math.atan((y2 - y1) / (x2 - x1));
        var rectX1 = centerX - 5 * Math.sin(slope) + 10 * Math.cos(slope);
        var rectY1 = centerY + 5 * Math.cos(slope) + 10 * Math.sin(slope);
        var rectX2 = centerX + 10 * Math.cos(slope) + 5 * Math.sin(slope);
        var rectY2 = centerY + 10 * Math.sin(slope) - 5 * Math.cos(slope);
        var rectX3 = centerX + 5 * Math.sin(slope) - 10 * Math.cos(slope);
        var rectY3 = centerY - 5 * Math.cos(slope) - 10 * Math.sin(slope);
        var rectX4 = centerX - 10 * Math.cos(slope) - 5 * Math.sin(slope);
        var rectY4 = centerY - 10 * Math.sin(slope) + 5 * Math.cos(slope);
        document.getElementById('svgline').appendChild(parseSVG('<polygon id=inductanceBox' + inductanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,215,0); stroke:black; stroke-width:1"><title>' + mhos + 'mhos</title></polygon>'));
        inductanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
    }
    if (drawCapacitance){
        var CapacitanceFinal = e;

        x1 = approx_x(CapacitanceInitial.pageX);
        y1 = approx_x(CapacitanceInitial.pageY);
        x2 = approx_x(CapacitanceFinal.pageX);
        y2 = approx_x(CapacitanceFinal.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)Can't insert both the legs of inductor to the same point.");
            return;
        }
        if (x2 < 25 || x2 > 465 || y2 < 45 || y2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (x1 < 25 || x1 > 465 || y1 < 45 || y1 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        var ufarad = prompt("(輸入電容單位)Enter the value of Capacitance in micro-farad", "Capacitance in micro-farad");
        ufarad = parseFloat(ufarad);
        if (isNaN(ufarad) || ufarad == '' || ufarad <= 0) {
            alert("(非正常數值)Invalid value of capacitance!");
            return;
        }
        document.getElementById('svgline').appendChild(parseSVG('<line dataufarad"' + ufarad + '"id=capacitance' + capacitanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ufarad + 'ufarad</title></line>'));
        //to draw the box of the resistor
        var centerX = x1 - (x1 - x2) / 2;
        var centerY = y1 - (y1 - y2) / 2;
        var slope = Math.atan((y2 - y1) / (x2 - x1));
        var rectX1 = centerX - 5 * Math.sin(slope) + 10 * Math.cos(slope);
        var rectY1 = centerY + 5 * Math.cos(slope) + 10 * Math.sin(slope);
        var rectX2 = centerX + 10 * Math.cos(slope) + 5 * Math.sin(slope);
        var rectY2 = centerY + 10 * Math.sin(slope) - 5 * Math.cos(slope);
        var rectX3 = centerX + 5 * Math.sin(slope) - 10 * Math.cos(slope);
        var rectY3 = centerY - 5 * Math.cos(slope) - 10 * Math.sin(slope);
        var rectX4 = centerX - 10 * Math.cos(slope) - 5 * Math.sin(slope);
        var rectY4 = centerY - 10 * Math.sin(slope) + 5 * Math.cos(slope);
        document.getElementById('svgline').appendChild(parseSVG('<polygon id=capacitanceBox' + inductanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,0,0); stroke:black; stroke-width:1"><title>' + ufarad + 'ufarad</title></polygon>'));
        capacitanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
    }
    if (drawAlligator == 1) {
        var AlligatorFinal = e;

        x1 = AlligatorX1;
        y1 = AlligatorY1;
        x2 = approx_x(AlligatorFinal.pageX);
        y2 = approx_x(AlligatorFinal.pageY);
        x2 += 10;
        if (x2 < 575 || x2 > 1015 || y2 < 345 || y2 > 605) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)It is meaningless to insert both the ends of wire to the same point.");
            return;
        }
        document.getElementById('svgline2').appendChild(parseSVG('<line id=Alligator' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"/>'));
        alligatorNo++;
        AlligatorInitial = null;
        colorNo = (colorNo + 1) % colorlist.length;
        toggleAlligatorButton();
    }
    if (deletemode == 1) {
        console.log(delIni);

        var delFin = e;
        console.log(delFin);
        x1 = approx_x(delIni.pageX);
        y1 = approx_x(delIni.pageY);
        x2 = approx_x(delFin.pageX);
        y2 = approx_x(delFin.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        var id;
        Things = $("line");
        for (var i = Things.length - 1; i >= 0; i--) {
            if (Things[i].x1.baseVal.value == x1) {
                if (Things[i].y1.baseVal.value == y1 && Things[i].x2.baseVal.value == x2 && Things[i].y2.baseVal.value == y2) {
                    console.log(Things[i].id[0]);
                    if (Things[i].id[0] == "w") {
                        $("#" + Things[i].id).remove();
                    }

                    if (Things[i].id[0] == "r") {

                        $("#resistanceBox" + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }
                    if (Things[i].id[0] == "i") {

                        $("#inductanceBox" + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }
                    if (Things[i].id[0] == "L") {

                        $("#LEdcircle" + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }

                    return;
                }
            }
            if (Things[i].x2.baseVal.value == x1) {
                if (Things[i].y2.baseVal.value == y1 && Things[i].x1.baseVal.value == x2 && Things[i].y1.baseVal.value == y2) {
                    console.log(Things[i].id[0]);
                    if (Things[i].id[0] == "w") {
                        $("#" + Things[i].id).remove();
                    }
                    if (Things[i].id[0] == "r") {

                        $("#resistanceBox" + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }
                    if (Things[i].id[0] == "i") {

                        $("#inductanceBox" + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }
                    if (Things[i].id[0] == "L") {
                        //  console.log("#LEdcircle"+Things[i].id[Things[i].id.length -1]);
                        $("#LEdcircle" + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }
                    return;
                }
            }
        };
    }
});
$(document).ready(function () {

    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var current_x = 0;
    context.strokeStyle = "rgb(208, 208, 208)";
    context.fillStyle = "rgb(88, 88, 88)";
    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(current_x, 40, 10, 10);
        };
        current_x = current_x + 20;
    };
    current_x = 0;
    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(current_x, 60, 10, 10);
        };
        current_x = current_x + 20;
    };
    current_x = 0;
    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.beginPath(); // Start the path
    context.moveTo(0, 35); // Set the path origin
    context.lineTo(50 * 11 - 5, 35); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

    context.strokeStyle = "black";
    context.beginPath(); // Start the path
    context.moveTo(0, 75); // Set the path origin
    context.lineTo(50 * 11 - 5, 75); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 23; i++) {
            current_x = current_x + 20;
            context.fillRect(current_x, 80 + 20 * j, 10, 10);
        };
        current_x = 0;

    };

    context.lineWidth = 3;
    context.strokeStyle = "blue";
    context.beginPath(); // Start the path
    context.moveTo(0, 175); // Set the path origin
    context.lineTo(50 * 11 - 5, 175); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path


    context.fillStyle = "rgb(88,88,88)";
    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 23; i++) {
            current_x = current_x + 20;
            context.fillRect(current_x, 180 + 20 * j, 10, 10);
        };
        current_x = 0;

    };
    current_x = 0;
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.beginPath(); // Start the path
    context.moveTo(0, 275); // Set the path origin
    context.lineTo(50 * 11 - 5, 275); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

    current_x = 0;
    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(current_x, 280, 10, 10);
        };
        current_x = current_x + 20;
    };
    current_x = 0;

    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(current_x, 300, 10, 10);
        };
        current_x = current_x + 20;
    };

    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.beginPath(); // Start the path
    context.moveTo(0, 315); // Set the path origin
    context.lineTo(50 * 11 - 5, 315); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

});
function toggleDelButton() {
    if (drawInductance == 1) {
        $this = $("#addInductance");
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else if (drawResistance == 1) {
        $this = $("#addResistance");
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else if (drawWire == 1) {
        $this = $("#addWire");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else if (drawCapacitance == 1) {
        $this = $("#addCapacitance");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    $this = $("#del");
    if (deletemode == 1) {
        $this.css('background-color', 'white');
        deletemode = 0;

    } else {
        $this.css('background-color', 'red');
        deletemode = 1;
    }
}

function toggleCapacitanceButton() {
    if (drawInductance == 1) {
        $this = $("#addInductance");
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else if (drawResistance == 1) {
        $this = $("#addResistance");
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else if (drawWire == 1) {
        $this = $("#addWire");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    $this = $("#addCapacitance");
    if (drawCapacitance == 1) {
        $this.css('background-color', 'white');
        drawCapacitance = 0;
    }
    else {
        $this.css('background-color', 'red');
        drawCapacitance = 1;
    }
}
function toggleWireButton() {
    if (drawInductance == 1) {
        $this = $("#addInductance");
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else if (drawResistance == 1) {
        $this = $("#addResistance");
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else if (drawCapacitance == 1) {
        $this = $("#addCapacitance");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    $this = $("#addWire");
    if (drawWire == 1) {
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    else {
        $this.css('background-color', 'red');
        drawWire = 1;
    }
};

function toggleResistanceButton() {
    if (drawInductance == 1) {
        $this = $("#addInductance");
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
    }
    else if (drawWire == 1) {
        $this = $("#addWire");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else if (drawCapacitance == 1) {
        $this = $("#addCapacitance");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    $this = $("#addResistance");
    if (drawResistance == 1) {
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else {
        $this.css('background-color', 'red');
        drawResistance = 1;
    }
};

function toggleInductanceButton() {
    if (drawResistance == 1) {
        $this = $("#addResistance");
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
    }
    else if (drawWire == 1) {
        $this = $("#addWire");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else if (drawCapacitance == 1) {
        $this = $("#addCapacitance");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    $this = $("#addInductance");
    if (drawInductance == 1) {
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else {
        $this.css('background-color', 'red');
        drawInductance = 1;
    }
};
function toggleAlligatorButton() {
    if (drawResistance == 1) {
        $this = $("#addResistance");
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
    }
    else if (drawWire == 1) {
        $this = $("#addWire");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    else if (drawInductance == 1) {
        $this = $("#addInductance");
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else if (drawCapacitance == 1) {
        $this = $("#addCapacitance");
        $this.css('background-color', 'white');
        drawWire = 0;
    }
    $this = $("#addAlligator");
    if (drawAlligator == 1) {
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else {
        $this.css('background-color', 'red');
        drawAlligator = 1;
    }
};


const MaxNodeNum = 100;

function findNodeNum(x, y) {
    //multimeter 點還沒做
    //node 0~19 保留做特殊用途
    let alligatorNodeList = [
        { x: 1285, y: 545 }, { x: 1250, y: 545 }, { x: 1385, y: 545 }, { x: 1350, y: 545 },
        { x: 85, y: 565 }, { x: 145, y: 565 }, { x: 205, y: 565 },
        { x: 345, y: 425 }, { x: 405, y: 425 }, { x: 465, y: 425 }
    ];//length : 10

    //check buttom node
    for (let i = 0; i < alligatorNodeList.length; i++) {
        if (x == alligatorNodeList[i].x && y == alligatorNodeList[i].y) {
            return i;
        }
    }

    // find breadboard node
    if (y >= 40 && y <= 50) {
        return 20;
    } else if (y >= 60 && y <= 70) {
        return 21;
    } else if (y >= 280 && y <= 290) {
        return 22;
    } else if (y >= 300 && y <= 310) {
        return 23;
    } else if (y >= 80 && y <= 170) {
        x -= x % 20;
        return x / 20 + 23;
    } else if (y >= 180 && y <= 270) {
        x -= x % 20;
        return x / 20 + 46;
    }
}


function getWires() {
    //find all wires in the html
    var wires = $("[id^='wire']");
    var wiresOut = $.map(wires, function (wire) {
        return {
            id: wire.id,
            x1: wire.x1.baseVal.value,
            y1: wire.y1.baseVal.value,
            x2: wire.x2.baseVal.value,
            y2: wire.y2.baseVal.value,
            node1: findNodeNum(wire.x1.baseVal.value, wire.y1.baseVal.value),
            node2: findNodeNum(wire.x2.baseVal.value, wire.y2.baseVal.value)
        };
    });
    for (let i = 0; i < wiresOut.length; i++) {
        var wire = wiresOut[i];
        console.log(wire.id, wire.x1, wire.y1, wire.x2, wire.y2);
    }
    return wiresOut;
}

function getAlligator() {
    //find all alligators in the html
    var alligators = $("[id^='Alligator']");
    let offsetX = 550;
    let offsetY = 300;
    var alligatorOut = $.map(alligators, function (alligator) {
        return {
            id: alligator.id,
            x1: alligator.x1.baseVal.value,
            y1: alligator.y1.baseVal.value,
            x2: alligator.x2.baseVal.value - offsetX,
            y2: alligator.y2.baseVal.value - offsetY,
            node1: findNodeNum(alligator.x1.baseVal.value, alligator.y1.baseVal.value),
            node2: findNodeNum(alligator.x2.baseVal.value - offsetX, alligator.y2.baseVal.value - offsetY)
        };
    });
    for (let i = 0; i < alligatorOut.length; i++) {
        var alligator = alligatorOut[i];
        console.log(alligator.id, alligator.x1, alligator.y1, alligator.x2, alligator.y2);
    }
    return alligatorOut;
}


function getResitance() {
    //find all resitance in the html
    var resistances = $("line[id^='resistance']");
    var resistanceOut = $.map(resistances, function (resistance) {
        var rval = $("#" + resistance.id).attr("dataohm");
        return {

            id: resistance.id,
            val: rval,
            x1: resistance.x1.baseVal.value,
            y1: resistance.y1.baseVal.value,
            x2: resistance.x2.baseVal.value,
            y2: resistance.y2.baseVal.value,
            node1: findNodeNum(resistance.x1.baseVal.value, resistance.y1.baseVal.value),
            node2: findNodeNum(resistance.x2.baseVal.value, resistance.y2.baseVal.value),
        };
    });

    for (let i = 0; i < resistanceOut.length; i++) {
        var resistance = resistanceOut[i];
        console.log(resistance.id, resistance.x1, resistance.y1, resistance.x2, resistance.y2, resistance.val);
    }
    return resistanceOut;
}


function findPotential(status, links) {
    //check short or not --> unfinished
    let INF = 100;
    let potential = new Array(MaxNodeNum);
    potential.fill(INF);
    console.log(potential);
    let change = true;
    if (powersupplyOutputStatus == 1) {
        if (status == 1) {
            if (current1 != 0) {
                alert("這個實驗不需要操作電流，請將電流設置為 0\n Please set the current to zero.\n We don't need to change it in this experiment.");
                return [];
            }
            potential[0] = 0;           //negative
            potential[1] = voltage1;    //positive
        } else if (status == 2) {
            if (current1 != 0) {
                alert("這個實驗不需要操作電流，請將電流設置為 0\n Please set the current to zero.\n We don't need to change it in this experiment.");
                return [];
            }
            potential[2] = 0;           //negative
            potential[3] = voltage2;    //positive
        }
    } else {
        alert("電源供應器除了 power 要打開外，ouput也要打開\n please open powersupply's power and output.");
        return [];
    }
    while (change) {
        change = false;
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            let node1 = link.node1;
            let node2 = link.node2;
            console.log("node1", node1, ":", potential[node1]);
            console.log("node2", node2, ":", potential[node2]);
            if (node1 <= 4 && node2 <= 4) {
                //linking powersupplyer
                alert("short");
                return [];
            }
            if (node1 == node2) {
                // safe, but do nothing
            } else if (potential[node1] != INF && potential[node2] != INF && potential[node1] != potential[node2]) {
                //short
                alert("short");
                return [];
            } else if ((potential[node1] == potential[node2]) || (potential[node1] == INF && potential[node2] == INF)) {
                //都沒連到或者已經連了
                //do nothing
            } else {
                // connect it, only one side is INF
                if (potential[node1] == INF) {
                    potential[node1] = potential[node2];
                } else {
                    potential[node2] = potential[node1];
                }
                change = true;
            }
        }
    }
    return potential;
}

var vis = [];

function dfs(graph, node, color) {
    if (vis[node] != 0) return;
    vis[node] = color;
    //console.log(node, graph[node]);
    for (let i = 0; i < graph[node].length; i++) {
        var u = graph[node][i];
        dfs(graph, u, color);
    }
}

function findConnected(graph) {

    var color = 1;
    vis = [];
    for (let i = 0; i < MaxNodeNum; i++) {
        vis.push(0);
    }
    //console.log(vis, color);
    for (let i = 0; i < MaxNodeNum; i++) {
        if (vis[i] == 0) {
            dfs(graph, i, color++);
        }
    }
    //console.log(vis, color);
}


function check() {
    // 檢查電路連通而且沒有 short --> unfinished
    // check the positive and negative are connected(resitance, multimeter should also be concerned)
    // make it to a graph and run dfs
    let links = [];      //存所有連接的電線 + 鱷魚夾，用來檢查 有沒有短路發生
    var graph = [];
    for (let i = 0; i <= MaxNodeNum; i++) {
        graph[i] = [];
    }
    console.log(graph);
    let wires = getWires();
    for (let i = 0; i < wires.length; i++) {
        var wire = wires[i];
        graph[wire.node1].push(wire.node2);
        graph[wire.node2].push(wire.node1);
        links.push({ node1: wire.node1, node2: wire.node2 });
    }

    let alligators = getAlligator();
    for (let i = 0; i < alligators.length; i++) {
        let alli = alligators[i];
        graph[alli.node1].push(alli.node2);
        graph[alli.node2].push(alli.node1);
        links.push({ node1: alli.node1, node2: alli.node2 });
    }

    let resitances = getResitance();
    for (let i = 0; i < resitances.length; i++) {
        let r = resitances[i];
        graph[r.node1].push(r.node2);
        graph[r.node2].push(r.node1);
    }

    findConnected(graph);
    console.log(vis);

    // find powersupplyer's positive and negative : use not use(0), left one(1), right(2) one or both(3)
    let powerUseStatus = 0;
    if (vis[0] == vis[1] && vis[2] == vis[3]) {
        powerUseStatus = 3;
        alert("這個實驗只需要一組輸出喔!\nyou don't need to use two powersupply in this experiment");
        return;
    } else if (vis[0] == vis[1]) {
        powerUseStatus = 1;
    } else if (vis[2] == vis[3]) {
        powerUseStatus = 2;
    }
    if (powerUseStatus == 0) {
        alert("斷路了，電源供應器兩端沒有接再一起。\n open circuit");
        return;
    }
    let potential = findPotential(powerUseStatus, links);
    // check there is no short condition 
    if (potential.length == 0) {
        return;
    }

}
