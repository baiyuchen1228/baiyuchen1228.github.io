var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID

var meter1_mode = 0;
var meter2_mode = 0;
const meter_1_mode = [0, 1, 2, 3, 4];
const meter_2_mode = [0, 1, 2, 3, 4, 5];
const meter_1_Mode = ['關機', '600直流V', '200直流V', '20直流V', '2直流V']
const meter_2_Mode = ['Hz', '200u直流A', '2m直流A', '20m直流A', '200m直流A', '10直流A']

const colorlist = ['Red', 'Black', 'DeepSkyBlue', 'Brown', 'DarkRed', 'Blue', 'Magenta', 'Cyan', 'Lime', 'Orange', 'Purple', 'SkyBlue', 'Indigo', 'Fuchsia', 'DarkCyan', 'Olive', 'SeaGreen', 'Goldenrod']
var colorNo = 0;

var delALLalligator = null;

var pointarray = [];
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
    if (drawResistance == 1) {
        $this = $("#addResistance");
        $this.css('background-color', 'white');
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
        delALLalligator = null;
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
        drawCapacitance = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
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

function turnOffMode() {
    if (drawResistance == 1) {
        if (resistanceOn == 1) {
            $this = $("#addResistance");
            $this.css('background-color', 'white');
        }
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
        delALLalligator = null;
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
        drawCapacitance = 0;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
}
document.getElementById("powersupply13").onclick = function () {
    turnOffMode();
    if (power == 1 && powersupplyOutputStatus == 0) {
        powersupplyOutputStatus = 1;
        $("#powersupply13").css("background-color", "Lightgreen");
        console.log("output on!");
        check();
        console.log(va.voltage, va.current);
    } else {
        powersupplyOutputStatus = 0;
        $("#powersupply13").css("background-color", "White");
        console.log("power off!");
    }
}


addcurrent1.onclick = function () {
    turnOffMode();
    if (power == 1) {
        current1 += 0.01;
        cur1.innerHTML = current1.toFixed(2);
    }
    check();
}

addvoltage1.onclick = function () {
    turnOffMode();
    if (power == 1) {
        voltage1 += 0.1;
        vol1.innerHTML = voltage1.toFixed(1);
    }
    check();
}

addcurrent2.onclick = function () {
    turnOffMode();
    if (power == 1) {
        current2 += 0.01;
        cur2.innerHTML = current2.toFixed(2);
    }
    check();
}

addvoltage2.onclick = function () {
    turnOffMode();
    if (power == 1) {
        voltage2 += 0.1;
        vol2.innerHTML = voltage2.toFixed(1);
    }
    check();
}

deccurrent1.onclick = function () {
    turnOffMode();
    if (power == 1) {
        current1 -= 0.01;
        if (current1 < 0) {
            current1 = 0;
        }
        cur1.innerHTML = current1.toFixed(2);
    }
    check();
}

decvoltage1.onclick = function () {
    turnOffMode();
    if (power == 1) {
        voltage1 -= 0.1;
        if (voltage1 < 0) {
            voltage1 = 0;
        }
        vol1.innerHTML = voltage1.toFixed(1);
    }
    check();
}

deccurrent2.onclick = function () {
    turnOffMode();
    if (power == 1) {
        current2 -= 0.01;
        if (current2 < 0) {
            current2 = 0;
        }
        cur2.innerHTML = current2.toFixed(2);
    }
    check();
}

decvoltage2.onclick = function () {
    turnOffMode();
    if (power == 1) {
        voltage2 -= 0.1;
        if (voltage2 < 0) {
            voltage2 = 0;
        }
        vol2.innerHTML = voltage2.toFixed(1);
    }
    check();
}



meter1_clockwise.onclick = function () {
    turnOffMode();
    let last_mode = meter1_mode;
    meter1_mode = (meter1_mode + 1) % 5;
    $("#multimeter1").removeClass('multimeter-1-bg' + last_mode).addClass('multimeter-1-bg' + meter1_mode);
    $("#multimeter1_7").text('狀態:' + meter_1_Mode[meter1_mode]);
    check();
}

meter1_counterclockwise.onclick = function () {
    turnOffMode();
    let last_mode = meter1_mode;
    meter1_mode = (meter1_mode - 1 + 5) % 5;
    $("#multimeter1").removeClass('multimeter-1-bg' + last_mode).addClass('multimeter-1-bg' + meter1_mode);
    $("#multimeter1_7").text('狀態:' + meter_1_Mode[meter1_mode]);
    check();
}

meter2_clockwise.onclick = function () {
    turnOffMode();
    let last_mode = meter2_mode;
    meter2_mode = (meter2_mode + 1) % 6;
    $("#multimeter2").removeClass('multimeter-2-bg' + last_mode).addClass('multimeter-2-bg' + meter2_mode);
    $("#multimeter2_7").text('狀態:' + meter_2_Mode[meter2_mode]);
    check();
}

meter2_counterclockwise.onclick = function () {
    turnOffMode();
    let last_mode = meter2_mode;
    meter2_mode = (meter2_mode - 1 + 6) % 6;
    $("#multimeter2").removeClass('multimeter-2-bg' + last_mode).addClass('multimeter-2-bg' + meter2_mode);
    $("#multimeter2_7").text('狀態:' + meter_2_Mode[meter2_mode]);
    check();
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
var AlligatorX1 = 0, AlligatorY1 = 0;
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
var resistanceOn = 1;
var inductanceNo = 1;
var alligatorNo = 1;
var capacitanceNo = 1;
var deletemode = 0;
var delIni;

var meter2On = 1;


power_drowline1.onmousedown = function (e) {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 1285;
        AlligatorY1 = 545;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1285, 545];
    }
}
power_drowline2.onmousedown = function (e) {
    colorNo = 1;
    if (drawAlligator) {
        AlligatorX1 = 1250;
        AlligatorY1 = 545;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1250, 545];
    }
}
power_drowline3.onmousedown = function (e) {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 1385;
        AlligatorY1 = 545;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1385, 545];
    }
}
power_drowline4.onmousedown = function (e) {
    colorNo = 1;
    if (drawAlligator) {
        AlligatorX1 = 1350;
        AlligatorY1 = 545;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1350, 545];
    }
}
meter1_drowline1.onmousedown = function (e) {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 85;
        AlligatorY1 = 565;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [85, 565];
    }
}
meter1_drowline2.onmousedown = function (e) {
    colorNo = 1;
    if (drawAlligator) {
        AlligatorX1 = 145;
        AlligatorY1 = 565;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [145, 565];
    }
}
meter1_drowline3.onmousedown = function (e) {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 205;
        AlligatorY1 = 565;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [205, 565];
    }
}
meter2_drowline1.onmousedown = function (e) {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 355;
        AlligatorY1 = 480;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [355, 480];
    }
}
meter2_drowline2.onmousedown = function (e) {
    colorNo = 1;
    if (drawAlligator) {
        AlligatorX1 = 405;
        AlligatorY1 = 480;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [405, 480];
    }
}
meter2_drowline3.onmousedown = function (e) {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 455;
        AlligatorY1 = 480;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [455, 480];
    }
}

function switchMeter2(){
    if (meter2On == 1) {
        $("#multimeter2_8").css('background-color', '#CCCCCC');
        meter2On = 0;
    }
    else {
        $("#multimeter2_8").css('background-color', 'lightgreen');
        meter2On = 1;
    }
}

function switchResistance() {
    if (resistanceOn == 1) {
        $("#addResistance").css('background-color', '#CCCCCC');
        resistanceOn = 0;
    }
    else {
        $("#addResistance").css('background-color', 'white');
        resistanceOn = 1;
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
    if (drawCapacitance == 1) {
        CapacitanceInitial = e;
    }
    if (deletemode == 1) {
        delIni = e;
    }
    if (!document.onmousemove)
        document.onmousemove = drawDashedLine();
});

function drawDashedLine() {
    function draw(e) {
        let mode = false;
        if (drawWire == 1) {
            x1 = approx_x(wireInitial.pageX);
            y1 = approx_x(wireInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 540;
            x2 -= 540;
            y1 -= 300;
            y2 -= 300;
            mode = true;
        }
        if (drawResistance == 1) {
            x1 = approx_x(resistanceInitial.pageX);
            y1 = approx_x(resistanceInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 540;
            x2 -= 540;
            y1 -= 300;
            y2 -= 300;
            mode = true;
        }
        if (drawInductance == 1) {
            x1 = approx_x(inductanceInitial.pageX);
            y1 = approx_x(inductanceInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 540;
            x2 -= 540;
            y1 -= 300;
            y2 -= 300;
            mode = true;
        }
        if (drawCapacitance == 1) {
            x1 = approx_x(CapacitanceInitial.pageX);
            y1 = approx_x(CapacitanceInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 540;
            x2 -= 540;
            y1 -= 300;
            y2 -= 300;
            mode = true;
        }
        if (mode) {
            if ($("#dashline").length > 0) {
                $("#dashline").remove();
                document.getElementById('svgline').appendChild(parseSVG('<line id=dashline x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ';" stroke-width:5 stroke-dasharray="5"></line>'));
            }
            else {
                document.getElementById('svgline').appendChild(parseSVG('<line id=dashline x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ';" stroke-width:5 stroke-dasharray="5"></line>'));
            }
        }
    }
    return draw;
}

function drawDashedLine2() {
    function draw(e) {
        let mode = false;
        if (drawAlligator == 1) {
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x2 += 10;
            mode = true;
        }
        if (mode) {
            if ($("#dashline").length > 0) {
                $("#dashline").remove();
                document.getElementById('svgline2').appendChild(parseSVG('<line id=dashline x1=' + AlligatorX1 + ' y1=' + AlligatorY1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ';" stroke-width:5 stroke-dasharray="5"></line>'));
            }
            else {
                document.getElementById('svgline2').appendChild(parseSVG('<line id=dashline x1=' + AlligatorX1 + ' y1=' + AlligatorY1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ';" stroke-width:5 stroke-dasharray="5"></line>'));
            }
        }
    }
    return draw;
}

function parseSVG(s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}

function deleteRow(arr, row) {
    arr = arr.slice(0); // make copy
    arr.splice(row, 1);
    return arr;
}

$("#container").mouseup(function (e) {
    $("#dashline").remove();
    document.onmousemove = null;
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
        for (let i = 0; i < pointarray.length; i++) {
            if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 == pointarray[i][0] && y2 == pointarray[i][1])) {
                alert("(不能在同一點畫線)It is meaningless to insert two wire to the same point.");
                return;
            }
        }
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
        if (wireNo < 10) {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=wireCircle1_0' + wireNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=wireCircle2_0' + wireNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line id=wire0' + wireNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=wireCircle1_' + wireNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=wireCircle2_' + wireNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line id=wire' + wireNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
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
        for (let i = 0; i < pointarray.length; i++) {
            if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 == pointarray[i][0] && y2 == pointarray[i][1])) {
                alert("(不能在同一點畫線)It is meaningless to insert two wire to the same point.");
                return;
            }
        }
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
        if (resistanceNo < 10) {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=resistanceCircle1_0' + resistanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=resistanceCircle2_0' + resistanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line dataohm="' + ohms + '"id=resistance0' + resistanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ohms + 'ohms</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=resistanceBox0' + resistanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:blue; stroke:lime; stroke-width:1"><title>' + ohms + 'ohms</title></polygon>'));
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=resistanceCircle1_' + resistanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=resistanceCircle2_' + resistanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line dataohm="' + ohms + '"id=resistance' + resistanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ohms + 'ohms</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=resistanceBox' + resistanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:blue; stroke:lime; stroke-width:1"><title>' + ohms + 'ohms</title></polygon>'));
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        resistanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
        switchResistance();
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
        for (let i = 0; i < pointarray.length; i++) {
            if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 == pointarray[i][0] && y2 == pointarray[i][1])) {
                alert("(不能在同一點畫線)It is meaningless to insert two wire to the same point.");
                return;
            }
        }
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
        if (inductanceNo < 10) {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=inductanceCircle1_0' + inductanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=inductanceCircle2_0' + inductanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line datamho="' + mhos + '"id=inductance0' + inductanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + mhos + 'mhos</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=inductanceBox0' + inductanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,215,0); stroke:black; stroke-width:1"><title>' + mhos + 'mhos</title></polygon>'));
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=inductanceCircle1_' + inductanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=inductanceCircle2_' + inductanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line datamho="' + mhos + '"id=inductance' + inductanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + mhos + 'mhos</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=inductanceBox' + inductanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,215,0); stroke:black; stroke-width:1"><title>' + mhos + 'mhos</title></polygon>'));
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        inductanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
    }
    if (drawCapacitance) {
        var CapacitanceFinal = e;

        x1 = approx_x(CapacitanceInitial.pageX);
        y1 = approx_x(CapacitanceInitial.pageY);
        x2 = approx_x(CapacitanceFinal.pageX);
        y2 = approx_x(CapacitanceFinal.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        for (let i = 0; i < pointarray.length; i++) {
            if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 == pointarray[i][0] && y2 == pointarray[i][1])) {
                alert("(不能在同一點畫線)It is meaningless to insert two wire to the same point.");
                return;
            }
        }
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
        if (capacitanceNo < 10) {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=capacitanceCircle1_0' + capacitanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=capacitanceCircle2_0' + capacitanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line dataufarad="' + ufarad + '"id=capacitance0' + capacitanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ufarad + 'ufarad</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=capacitanceBox0' + capacitanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,0,0); stroke:black; stroke-width:1"><title>' + ufarad + 'ufarad</title></polygon>'));
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=capacitanceCircle1_' + capacitanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=capacitanceCircle2_' + capacitanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line dataufarad="' + ufarad + '"id=capacitance' + capacitanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ufarad + 'ufarad</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=capacitanceBox' + capacitanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,0,0); stroke:black; stroke-width:1"><title>' + ufarad + 'ufarad</title></polygon>'));
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
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
        for (let i = 0; i < pointarray.length; i++) {
            if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 - 550 == pointarray[i][0] && y2 - 300 == pointarray[i][1])) {
                alert("(不能在同一點畫線)It is meaningless to insert two wire to the same point.");
                return;
            }
        }
        if (x1 == 0 || y1 == 0) {
            alert('(請先點按鈕)please click button first');
            return;
        }
        if (x2 < 575 || x2 > 1015 || y2 < 345 || y2 > 605) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)It is meaningless to insert both the ends of wire to the same point.");
            return;
        }
        if (alligatorNo < 10) {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_0' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_0' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator0' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"/>'));
        }
        else {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"/>'));
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        alligatorNo++;
        AlligatorInitial = null;
        colorNo = (colorNo + 1) % colorlist.length;
        AlligatorX1 = 0;
        AlligatorY1 = 0;
        // toggleAlligatorButton();
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
                    for (let j = 0; j < pointarray.length; j++) {
                        if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                            pointarray = deleteRow(pointarray, j);
                        }
                    }
                    for (let j = 0; j < pointarray.length; j++) {
                        if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                            pointarray = deleteRow(pointarray, j);
                        }
                    }
                    if (Things[i].id[0] == "w") {
                        $("#wireCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#wireCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }

                    if (Things[i].id[0] == "r") {
                        $("#resistanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#resistanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#resistanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                        switchResistance();
                    }
                    if (Things[i].id[0] == "i") {
                        $("#inductanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#inductanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#inductanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }
                    if (Things[i].id[0] == "c") {
                        $("#capacitanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#capacitanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#capacitanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }
                    if (Things[i].id[0] == "L") {

                        $("#LEdcircle" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }

                    return;
                }
            }
            if (Things[i].x2.baseVal.value == x1) {
                if (Things[i].y2.baseVal.value == y1 && Things[i].x1.baseVal.value == x2 && Things[i].y1.baseVal.value == y2) {
                    for (let j = 0; j < pointarray.length; j++) {
                        if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                            pointarray = deleteRow(pointarray, j);
                        }
                    }
                    for (let j = 0; j < pointarray.length; j++) {
                        if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                            pointarray = deleteRow(pointarray, j);
                        }
                    }
                    console.log(Things[i].id[0]);
                    pointarray.splice(jQuery.inArray([x1, y1], pointarray), 1);
                    pointarray.splice(jQuery.inArray([x2, y2], pointarray), 1);
                    if (Things[i].id[0] == "w") {
                        $("#wireCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#wireCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }

                    if (Things[i].id[0] == "r") {
                        $("#resistanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#resistanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#resistanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }
                    if (Things[i].id[0] == "i") {
                        $("#inductanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#inductanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#inductanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }
                    if (Things[i].id[0] == "c") {
                        $("#capacitanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#capacitanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#capacitanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                    }
                    if (Things[i].id[0] == "L") {
                        //  console.log("#LEdcircle"+Things[i].id[Things[i].id.length -1]);
                        $("#LEdcircle" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();

                    }
                    return;
                }
            }
        }
        if (delALLalligator != null) {
            x1 = delALLalligator[0];
            y1 = delALLalligator[1];
            x2 += 540;
            y2 += 300;
            x2 += 10;
            console.log([x1, y1, x2, y2]);
            for (var i = Things.length - 1; i >= 0; i--) {
                if (Things[i].x1.baseVal.value == x1) {
                    if (Things[i].y1.baseVal.value == y1 && Things[i].x2.baseVal.value == x2 && Things[i].y2.baseVal.value == y2) {
                        for (let j = 0; j < pointarray.length; j++) {
                            if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                                pointarray = deleteRow(pointarray, j);
                            }
                        }
                        for (let j = 0; j < pointarray.length; j++) {
                            if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                                pointarray = deleteRow(pointarray, j);
                            }
                        }
                        console.log(Things[i].id[0]);
                        pointarray.splice(jQuery.inArray([x1, y1], pointarray), 1);
                        pointarray.splice(jQuery.inArray([x2, y2], pointarray), 1);
                        if (Things[i].id[0] == "a") {
                            $("#alligatorCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                            $("#alligatorCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                            $("#" + Things[i].id).remove();
                            delALLalligator = null;
                        }
                        return;
                    }
                }
                if (Things[i].x2.baseVal.value == x1) {
                    if (Things[i].y1.baseVal.value == y1 && Things[i].x2.baseVal.value == x2 && Things[i].y2.baseVal.value == y2) {
                        for (let j = 0; j < pointarray.length; j++) {
                            if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                                pointarray = deleteRow(pointarray, j);
                            }
                        }
                        for (let j = 0; j < pointarray.length; j++) {
                            if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                                pointarray = deleteRow(pointarray, j);
                            }
                        }
                        console.log(Things[i].id[0]);
                        pointarray.splice(jQuery.inArray([x1, y1], pointarray), 1);
                        pointarray.splice(jQuery.inArray([x2, y2], pointarray), 1);
                        if (Things[i].id[0] == "a") {
                            $("#alligatorCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                            $("#alligatorCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                            $("#" + Things[i].id).remove();
                            delALLalligator = null;
                        }
                        return;
                    }
                }
            }
        }
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
        if (resistanceOn == 1) {
            $this = $("#addResistance");
            $this.css('background-color', 'white');
        }
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
        drawCapacitance = 0;
    }
    $this = $("#del");
    if (deletemode == 1) {
        $this.css('background-color', 'white');
        delALLalligator = null;
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
        delALLalligator = null;
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
        delALLalligator = null;
    }
    else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    else if (drawCapacitance == 1) {
        $this = $("#addCapacitance");
        $this.css('background-color', 'white');
        drawCapacitance = 0;
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
    if (resistanceOn == 0) return;
    if (drawInductance == 1) {
        $this = $("#addInductance");
        $this.css('background-color', 'white');
        drawInductance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
        delALLalligator = null;
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
        drawCapacitance = 0;
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
        delALLalligator = null;
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
        drawCapacitance = 0;
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
        if (resistanceOn == 1) {
            $this = $("#addResistance");
            $this.css('background-color', 'white');
        }
        drawResistance = 0;
    }
    else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
        delALLalligator = null;
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
        drawCapacitance = 0;
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
        { x: 355, y: 480 }, { x: 405, y: 480 }, { x: 455, y: 480 }
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
    var wires = $("line[id^='wire']");
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
    var alligators = $("line[id^='alligator']");
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


function getResistance() {
    //find all resistance in the html
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



var vis = [];

function dfs(graph, node, color) {
    if (vis[node] != 0) return;
    vis[node] = color;
    for (let i = 0; i < graph[node].length; i++) {
        var u = graph[node][i].nxt;
        dfs(graph, u, color);
    }
}

function findConnected(graph) {

    var color = 1;
    vis = [];
    for (let i = 0; i < MaxNodeNum; i++) {
        vis.push(0);
    }
    for (let i = 0; i < MaxNodeNum; i++) {
        if (vis[i] == 0) {
            dfs(graph, i, color++);
        }
    }
}


function checkCurrent(powerUseStatus, resistances) {
    //安培計要和電阻串聯 -> 把安培計拿掉之後電阻 + 電線不會連通
    let graph = getGraph();

    //加電阻
    for (let i = 0; i < resistances.length; i++) {
        let r = resistances[i];
        graph[r.node1].push({ nxt: r.node2, wei: r.val });
        graph[r.node2].push({ nxt: r.node1, wei: r.val });
    }

    findConnected(graph);
    //確認連通
    if ((powerUseStatus == 1 && vis[0] == vis[1]) || (powerUseStatus == 2 && vis[2] == vis[3])) {
        //確定電壓有跟正負極連接
        //留電線、電壓計、電阻後有connect --> 安培計沒有串聯
        return 0;
    }
    return 1;
}

function checkVoltage(powerUseStatus) {
    //確認電壓計有連通
    //電壓計與電阻並聯 --> 電阻拔掉電路要連通
    let graph = getGraph();
    //加電壓計
    if (meter1_mode != 0) {
        graph[4].push({ nxt: 5, wei: 1000000 });
        graph[5].push({ nxt: 4, wei: 1000000 });
    }

    // 安培計要串聯 --> 安培計當電線用
    if (meter2_mode != 0) {
        graph[7].push({ nxt: 8, wei: 0 });
        graph[8].push({ nxt: 7, wei: 0 });
    }
    findConnected(graph);
    //確認電壓計連通
    if ((powerUseStatus == 1 && vis[0] == vis[1]) || (powerUseStatus == 2 && vis[2] == vis[3])) {
        //確定電壓有跟正負極連接
        //留電線、電壓計、安培計後有connect
        return 1;
    }
    return 0;
}
function checkShort(powerUseStatus) {
    //parameter
    //      graph : only contain wires and alligators
    //      powerUseStatus : the status of powersupply(choose output)
    // check the circuit is short or not
    // 只有一個電阻的情況有 short : 把電阻拔掉還有電路可以從 + 連到 - 
    let graph = getGraph();
    if (meter2_mode != 0) {
        //安培計要串聯
        graph[7].push({ nxt: 8, wei: 0 });
        graph[8].push({ nxt: 7, wei: 0 });
    }

    findConnected(graph);

    if ((powerUseStatus == 1 && vis[0] == vis[1]) || (powerUseStatus == 2 && vis[2] == vis[3])) {
        alert("short!");
        return 1;
    }
    return 0;
}

function checkOpen(powerUseStatus, resistances) {
    //parameter
    //      graph : only contain wires and alligators
    //      powerUseStatus : the status of powersupply(choose output)
    // check the circuit is open or not
    // 電線 + 電阻 + 安培計都加確定有連通 
    let graph = getGraph();
    if (meter2_mode != 0) {
        //安培計要串聯
        graph[7].push({ nxt: 8, wei: 0 });
        graph[8].push({ nxt: 7, wei: 0 });
    }

    for (let i = 0; i < resistances.length; i++) {
        let r = resistances[i];
        graph[r.node1].push({ nxt: r.node2, wei: r.val });
        graph[r.node2].push({ nxt: r.node1, wei: r.val });
    }

    findConnected(graph);

    if ((powerUseStatus == 1 && vis[0] != vis[1]) || (powerUseStatus == 2 && vis[2] != vis[3])) {
        alert("open");
        return 1;
    }
    return 0;
}

function getGraph() {
    var graph = [];
    for (let i = 0; i <= MaxNodeNum; i++) {
        graph[i] = [];
    }
    let wires = getWires();
    for (let i = 0; i < wires.length; i++) {
        var wire = wires[i];
        graph[wire.node1].push({ nxt: wire.node2, wei: 0 });
        graph[wire.node2].push({ nxt: wire.node1, wei: 0 });
    }

    let alligators = getAlligator();
    for (let i = 0; i < alligators.length; i++) {
        let alli = alligators[i];
        graph[alli.node1].push({ nxt: alli.node2, wei: 0 });
        graph[alli.node2].push({ nxt: alli.node1, wei: 0 });
    }
    return graph;
}

function getPowerUseStatus() {
    let powerUseStatus = 0;             //確定 powersupply 狀態
    if (voltage1 != 0 && voltage2 != 0) {
        alert("本實驗不須用兩個電供\n This experiment is not allow to use two ouput of powersupply.")
        return 0;
    }
    if (voltage1 != 0) {
        powerUseStatus = 1;
    } else if (voltage2 != 0) {
        powerUseStatus = 2;
    }
    if (powersupplyOutputStatus == 0 || powerUseStatus == 0) {
        alert("電供沒開 ouput 或電壓沒有設定");
        return 0;
    }
    return powerUseStatus;
}


function checkCircuit() {
    // 檢查電路連通而且沒有 short --> unfinished
    // check the positive and negative are connected(resistance, multimeter should also be concerned)
    // make it to a graph and run dfs
    //var graph = getGraph();

    let powerUseStatus = getPowerUseStatus();             //確定 powersupply 狀態
    if (powerUseStatus == 0) {
        return { voltage: "ERR", current: "ERR" };
    }
    if (checkShort(powerUseStatus) == 1) {
        return { voltage: "ERR", current: "ERR" };
    }
    let resistances = getResistance();
    if (checkOpen(powerUseStatus, resistances) == 1) {
        return { voltage: "ERR", current: "ERR" };
    }

    let multimeterCurrentUseState = checkCurrent(powerUseStatus, resistances);   //確定安培計使用狀態
    let multimeterVoltageUseState = checkVoltage(powerUseStatus);       //確認電壓計有連通



    let result = { voltage: "ERR", current: "ERR" };
    let ans_voltage, ans_current;
    if (powerUseStatus == 1) {
        if (voltage1 > current1 * resistances[0].val) {
            ans_voltage = current1 * resistances[0].val;
            ans_current = current1;
        } else {
            ans_voltage = voltage1;
            ans_current = voltage1 / resistances[0].val;
        }
    } else {
        if (voltage2 > current2 * resistances[0].val) {
            ans_voltage = current2 * resistances[0].val;
            ans_current = current2;
        } else {
            ans_voltage = voltage2;
            ans_current = voltage2 / resistances[0].val;
        }
    }
    if (multimeterVoltageUseState == 1) {
        result.voltage = ans_voltage;
    }
    if (multimeterCurrentUseState == 1) {
        result.current = ans_current;
    }
    return result;
}

let edge_cnt = 0;
let edge_list = [];
class Edge {
    constructor(node1, node2, ohm) {
        //電流從 node1 流到 node2
        this._id = edge_cnt++;
        this._node1 = node1;
        this._node2 = node2;
        this._ohm = parseInt(ohm);
    }
    get id() {
        return this._id;
    }

    get node1() {
        return this._node1;
    }

    get node2() {
        return this._node2;
    }

    get ohm() {
        return this._ohm;
    }
    go_next(node) {
        if (this._node1 == node) {
            return this._node2;
        }
        return this._node1;
    }
    get_par(node) {
        if (this._node1 == node) {
            return this._ohm;
        }
        return -this._ohm;
    }
}


function getFullGraph() {
    edge_cnt = 0;
    var graph = [];
    for (let i = 0; i <= MaxNodeNum; i++) {
        graph[i] = [];
    }
    let wires = getWires();
    for (let i = 0; i < wires.length; i++) {
        let wire = wires[i];
        let e = new Edge(wire.node1, wire.node2, 0);
        edge_list.push(e);
        graph[wire.node1].push(e);
        graph[wire.node2].push(e);
    }

    let alligators = getAlligator();
    for (let i = 0; i < alligators.length; i++) {
        let alli = alligators[i];
        let e = new Edge(alli.node1, alli.node2, 0);
        edge_list.push(e);
        graph[alli.node1].push(e);
        graph[alli.node2].push(e);
    }

    let resistances = getResistance();
    for (let i = 0; i < resistances.length; i++) {
        let r = resistances[i];
        let e = new Edge(r.node1, r.node2, r.val);
        edge_list.push(e);
        graph[r.node1].push(e);
        graph[r.node2].push(e);
    }

    if (meter2_mode != 0) {
        //安培計要串聯
        let e = new Edge(7, 8, 0);
        edge_list.push(e);
        graph[7].push(e);
        graph[8].push(e);
    }

    //加電壓計
    if (meter1_mode != 0) {
        let e = new Edge(4, 5, 1000000);
        edge_list.push(e);
        graph[4].push(e);
        graph[5].push(e);
    }
    console.log(edge_list);
    return graph;
}

let equations = [];
let equation_cnt = 0;
let vis_edge = [];
let path = [];

//challenge : v0 不能給變數當電流，但連接時要當有連到
function find_loop(goal, node, graph, loop_length) {
    if (loop_length != 0 && goal == node) {
        //find loop
        console.log(path);
    }
    if (loop_length != 0) {
        console.log(path[loop_length - 1].edgeid, path[loop_length - 1].par);
    }
    console.log(node);
    if (node < 4 && path[loop_length - 1].edgeid != edge_cnt) {
        //challenge : v0 不能給變數當電流，但連接時要當有連到
        if (node == 0) {//正極
            path[loop_length] = { edgeid: edge_cnt, par: -voltage1 };
            find_loop(goal, 1, graph, loop_length + 1);
        }
        if (node == 2) {//正極
            path[loop_length] = { edgeid: edge_cnt, par: -voltage2 };
            find_loop(goal, 3, graph, loop_length + 1);
        }

        if (node == 1) {//負極
            path[loop_length] = { edgeid: edge_cnt, par: voltage1 };
            find_loop(goal, 0, graph, loop_length + 1);
        }

        if (node == 3) {//負極
            path[loop_length] = { edgeid: edge_cnt, par: voltage2 };
            find_loop(goal, 2, graph, loop_length + 1);
        }
    }
    for (let i = 0; i < graph[node].length; i++) {
        let edge = graph[node][i];
        if (vis[edge.id] == 0) {
            vis[edge.id] = 1;
            path[loop_length] = { edgeid: edge.id, par: edge.get_par(node) };
            find_loop(goal, edge.go_next(), graph, loop_length + 1);
            vis[edge.id] = 0;
        }
    }
}

function equation() {
    graph = getFullGraph();
    equations = [];
    equation_cnt = 0;
    vis_edge = [];
    path = [];

    for (let i = 4; i <= MaxNodeNum; i++) {//電供沒有流入等於流出
        if (graph[i].length == 0) {
            continue;
        }
        equations[equation_cnt] = [];
        for (let j = 0; j <= edge_cnt; j++) {
            equations[equation_cnt][j] = 0;
        }
        for (let j = 0; j < graph[i].length; j++) {
            let edge = graph[i][j];
            if (edge.node1 == i) {
                //流出
                equations[equation_cnt][edge.id] = 1;
            } else {
                equations[equation_cnt][edge.id] = -1;
            }
        }
        equation_cnt++;
    }

    for (let i = 4; i < MaxNodeNum; i++) {
        for (let j = 0; j < edge_cnt; j++) {
            vis[j] = 0;
        }
        find_loop(i, i, graph, 0);
    }
    console.log(equations);
}

function check() {
    let va = checkCircuit();
    if(getPowerUseStatus()==1){
        vol1.innerHTML = va.voltage.toFixed(2);
        cur1.innerHTML = va.current.toFixed(2);
    }
    else if(getPowerUseStatus()==2){
        vol2.innerHTML = va.voltage.toFixed(2);
        cur2.innerHTML = va.current.toFixed(2);    
    }
    if (meter1_mode == 0) {
        $("#multimeter1_3").text('');
    }
    else if (va.voltage == 'ERR') {
        $("#multimeter1_3").text(va.voltage);
    }
    else if (meter1_mode == 1) {
        let v = va.voltage.toFixed(0);
        if (v > 600) v = 'ERR'
        $("#multimeter1_3").text(v);
    }
    else if (meter1_mode == 2) {
        let v = va.voltage.toFixed(0);
        if (v > 200) v = 'ERR'
        $("#multimeter1_3").text(v);
    }
    else if (meter1_mode == 3) {
        let v = va.voltage.toFixed(1);
        if (v > 20) v = 'ERR'
        $("#multimeter1_3").text(v);
    }
    else if (meter1_mode == 4) {
        let v = va.voltage.toFixed(2);
        if (v > 2) v = 'ERR'
        $("#multimeter1_3").text(v);
    }
    if (meter2_mode == 0 || meter2On == 0) {
        $("#multimeter2_3").text('');
    }
    else if (va.current == 'ERR') {
        $("#multimeter2_3").text(va.current);
    }
    else if (meter2_mode == 1) {
        let c = va.current;
        c *= 1000000;
        c = c.toFixed(0);
        if (c > 200) c = 'ERR';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 2) {
        let c = va.current;
        c *= 1000;
        c = c.toFixed(2);
        if (c > 2) c = 'ERR';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 3) {
        let c = va.current;
        c *= 1000;
        c = c.toFixed(1);
        if (c > 20) c = 'ERR';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 4) {
        let c = va.current;
        c *= 1000;
        c = c.toFixed(0);
        if (c > 200) c = 'ERR';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 5) {
        let c = va.current;
        c = c.toFixed(1);
        if (c > 10) c = 'ERR';
        $("#multimeter2_3").text(c);
    }
    return;
}


