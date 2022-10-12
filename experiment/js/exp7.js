var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID

var startbool = false;

var meter1_mode = 0;
var meter2_mode = 0;
const meter_1_mode = [0, 1, 2, 3, 4];
const meter_2_mode = [0, 1, 2, 3, 4, 5];
const meter_1_Mode = ['關機', '600直流V', '200直流V', '20直流V', '2直流V']
const meter_2_Mode = ['Hz', '200u直流A', '2m直流A', '20m直流A', '200m直流A', '10直流A']

const colorlist = ['Red', 'DarkRed', 'FireBrick', 'LightCoral', 'OrangeRed', 'Chocolate', 'Black', 'Indigo', 'Navy', 'Black', 'DeepSkyBlue', 'Brown', 'DarkRed', 'Blue', 'Magenta', 'Cyan', 'Lime', 'Orange', 'Purple', 'SkyBlue', 'Indigo', 'Fuchsia', 'DarkCyan', 'Olive', 'SeaGreen', 'Goldenrod']
var colorNo = 11;

var delALLalligator = null;

var pointarray = [];


var current1 = 0, voltage1 = 0, current2 = 0, voltage2 = 0, power = 0, powersupplyOutputStatus = 0;


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
//var resistanceOn = 1;
var inductanceNo = 1;
var alligatorNo = 1;
var capacitanceNo = 1;
var deletemode = 0;
var delIni;

var meter2On = 0;

var generator_frequency = 1; // 1 * 10 ^ 2
var generator_frequency1 = 1;
var generator_frequency2 = 1;
var generator_power_on = false;
var wave_type;
var generator_inv_on = false;
var generator_AMPL1_on = false;
var generator_duty = 0.5;
var generator_offset_on = false;
var generator_offset = 0;
var generator_AMPL2_on = false;
var generator_AMPL = 1; // 1 * 10 ^ 0
var generator_AMPL_base = 1; 
var generator_AMPL_pow = 0;
var generator_output_on = false;





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

function turnOffMode() {
    if (drawResistance == 1) {
        //if (resistanceOn == 1) {
            $this = $("#addResistance");
            $this.css('background-color', 'white');
        //}
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
                document.getElementById('svgline').appendChild(parseSVG('<line id=dashline x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + '; stroke-width:5px;" stroke-dasharray="5"></line>'));
            }
            else {
                document.getElementById('svgline').appendChild(parseSVG('<line id=dashline x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + '; stroke-width:5px;" stroke-dasharray="5"></line>'));
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
                document.getElementById('svgline2').appendChild(parseSVG('<line id=dashline x1=' + AlligatorX1 + ' y1=' + AlligatorY1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ' ;stroke-width:5px;" stroke-dasharray="5"></line>'));
            }
            else {
                document.getElementById('svgline2').appendChild(parseSVG('<line id=dashline x1=' + AlligatorX1 + ' y1=' + AlligatorY1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ' ;stroke-width:5px;" stroke-dasharray="5"></line>'));
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
        if (y2 < 25 || y2 > 465 || x2 < 45 || x2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (y1 < 25 || y1 > 465 || x1 < 45 || x1 > 305) {
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
        turnOffMode();
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
        if (y2 < 25 || y2 > 465 || x2 < 45 || x2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (y1 < 25 || y1 > 465 || x1 < 45 || x1 > 305) {
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
        turnOffMode();
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
        if (y2 < 25 || y2 > 465 || x2 < 45 || x2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (y1 < 25 || y1 > 465 || x1 < 45 || x1 > 305) {
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
        if (y2 < 25 || y2 > 465 || x2 < 45 || x2 > 305) {
            alert('(請畫在麵包版上)please draw on breadboard');
            return;
        }
        if (y1 < 25 || y1 > 465 || x1 < 45 || x1 > 305) {
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
        if (x2 < 595 || x2 > 855 || y2 < 325 || y2 > 645) {
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
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator0' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px;"/>'));
        }
        else {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px;"/>'));
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        alligatorNo++;
        AlligatorInitial = null;
        colorNo = (colorNo + 1) % colorlist.length;
        AlligatorX1 = 0;
        AlligatorY1 = 0;
        // toggleAlligatorButton();
        turnOffMode();
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
    check();
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
            context.fillRect(40, current_x,10, 10);
        };
        current_x = current_x + 20;
    };
    current_x = 0;
    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(60, current_x,10, 10);
        };
        current_x = current_x + 20;
    };
    current_x = 0;
    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.beginPath(); // Start the path
    context.moveTo(35, 0); // Set the path origin
    context.lineTo(35, 50 * 11 - 5); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

    context.strokeStyle = "black";
    context.beginPath(); // Start the path
    context.moveTo(75, 0); // Set the path origin
    context.lineTo(75, 50 * 11 - 5); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 23; i++) {
            current_x = current_x + 20;
            context.fillRect(80 + 20 * j, current_x, 10, 10);
        };
        current_x = 0;

    };

    context.lineWidth = 3;
    context.strokeStyle = "blue";
    context.beginPath(); // Start the path
    context.moveTo(175, 0); // Set the path origin
    context.lineTo(175, 50 * 11 - 5); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path


    context.fillStyle = "rgb(88,88,88)";
    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 23; i++) {
            current_x = current_x + 20;
            context.fillRect(180 + 20 * j, current_x, 10, 10);
        };
        current_x = 0;

    };
    current_x = 0;
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.beginPath(); // Start the path
    context.moveTo(275, 0); // Set the path origin
    context.lineTo(275, 50 * 11 - 5); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path

    current_x = 0;
    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(280, current_x, 10, 10);
        };
        current_x = current_x + 20;
    };
    current_x = 0;

    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < 5; i++) {
            current_x = current_x + 20;
            context.fillRect(300, current_x, 10, 10);
        };
        current_x = current_x + 20;
    };

    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.beginPath(); // Start the path
    context.moveTo(315, 0); // Set the path origin
    context.lineTo(315, 50 * 11 - 5); // Set the path destination
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
    //if (resistanceOn == 0) return;
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
        //if (resistanceOn == 1) {
            $this = $("#addResistance");
            $this.css('background-color', 'white');
        //}
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

    //transpose to before --> swap(x, y)
    let tmo = x;
    x = y;
    y = tmo;


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
    // for (let i = 0; i < alligatorOut.length; i++) {
    //     var alligator = alligatorOut[i];
    //     console.log(alligator.id, alligator.x1, alligator.y1, alligator.x2, alligator.y2);
    // }
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
        var r = resistanceOut[i];
        r.val = parseInt(r.val);
        if (r.val == NaN) {
            alert("電阻不可以是小數")
        }
        //console.log(resistance.id, resistance.x1, resistance.y1, resistance.x2, resistance.y2, resistance.val);
    }
    return resistanceOut;
}

function abs(x) {
    if (x < 0) { return -x; }
    return x;
}


let edge_cnt = 0;
let edge_list = [];
class Edge {
    constructor(node1, node2, type, ohm) {
        //電流從 node1 流到 node2
        this._id = edge_cnt++;
        this._node1 = node1;
        this._node2 = node2;
        this._type = type;
        this._ohm = ohm;
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
    get type() {
        return this._type;
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

class GuassionElimination {
    constructor(R, C, A) {
        this.m = R;
        this.n = C;
        this.M = A;
    }

    // row operation 的加法，把一行乘一個數字加到另一行
    add(add_index, added_index, scalar) {
        for (let i = 0; i <= this.n; i++) {
            this.M[added_index][i] += this.M[add_index][i] * scalar;
        }
    }


    // row operation 的交換，兩行互換
    swap(swap_index1, swap_index2) {
        //把指標指的位置互換
        let tmp = this.M[swap_index1];
        this.M[swap_index1] = this.M[swap_index2];
        this.M[swap_index2] = tmp;
    }


    // row operation 的乘法，把一整行同乘一個常數
    multiple(index, scalar) {
        for (let i = 0; i <= this.n; i++) {
            this.M[index][i] *= scalar;
        }
    }

    Gaussian_Jordan_elimination() {
        let single = [];
        for (let i = 0; i < this.n; i++) {//Gaussian 下三角是0，且對角線是1
            if (this.M[i][i] == 0) {
                for (let j = i + 1; j < this.m; j++) {// go down to find the not zero value
                    if (this.M[j][i] != 0) {
                        this.swap(i, j);
                        break;
                    }
                }
            }
            if (this.M[i][i] == 0) {
                console.log("無唯一解/無解", i);
                console.log(this.M);
                single.push(i);
                continue;
            }
            this.multiple(i, 1.0 / this.M[i][i]);//把開頭變成1
            for (let j = i + 1; j < this.m; j++) {// elmination 往下把同column中所有非0的值消成0
                this.add(i, j, -1 * this.M[j][i]);
            }
        }
        for (let i = this.n - 1; i >= 0; i--) {//Jordan把上三角變0
            for (let j = 0; j < i; j++) {// 往上把同column中所有非0的值消成0
                //if(i == j)continue;
                this.add(i, j, -1 * this.M[j][i]);
            }
        }

        //after guassian elimination
        console.log("Guassian Elimination")
        console.log(this.M);
        
        //檢查是不是無解
        for(let i=this.n;i<this.m;i++){
            if(this.M[i][this.n] > 1e-10){
                console.log("無解");
                show_error("可能短路了<br> short!")
                let x = [];
                for (let i = 0; i < this.n; i++) {//存答案
                    x[i] = NaN;
                }
                return x;
            }
        }

        //我忘記這段在做什麼了QQ
        // for(let j=0;j<single.length;j++){
        //     let i = single[j];     // 123456789
        //     if(this.M[i][this.n] != 0){
        //         console.log("無解");
        //         let x = [];
        //         for (let i = 0; i < this.n; i++) {//存答案
        //             x[i] = NaN;
        //         }
        //         return x;
        //     }
        // }

        let x = [];
        for (let i = 0; i < this.n; i++) {//存答案
            x[i] = this.M[i][this.n];
        }
        return x;
    }
}

function getFullGraph(graph) {

    let wires = getWires();
    for (let i = 0; i < wires.length; i++) {
        let wire = wires[i];
        let e = new Edge(wire.node1, wire.node2, "wire", 0);
        edge_list.push(e);
        graph[wire.node1].push(e);
        graph[wire.node2].push(e);
    }

    let alligators = getAlligator();
    for (let i = 0; i < alligators.length; i++) {
        let alli = alligators[i];
        let e = new Edge(alli.node1, alli.node2, "wire", 0);
        edge_list.push(e);
        graph[alli.node1].push(e);
        graph[alli.node2].push(e);
    }

    let resistances = getResistance();
    for (let i = 0; i < resistances.length; i++) {
        let r = resistances[i];
        let e = new Edge(r.node1, r.node2, "resistance", r.val);
        edge_list.push(e);
        graph[r.node1].push(e);
        graph[r.node2].push(e);
    }

    let curr_eid = -1;
    if (meter2_mode == 5) {
        //安培計要串聯
        let e = new Edge(7, 8, "ammeter", 0);
        edge_list.push(e);
        graph[7].push(e);
        graph[8].push(e);
        curr_eid = e.id;
    }else if(meter2_mode != 0){
        let e = new Edge(8, 9, "ammeter", 0);
        edge_list.push(e);
        graph[8].push(e);
        graph[9].push(e);
        curr_eid = e.id;
    }

    //加電壓計
    let vol_eid = -1;
    if (meter1_mode != 0) {
        let e = new Edge(4, 5, "voltmeter", 100000000);
        edge_list.push(e);
        graph[4].push(e);
        graph[5].push(e);
        vol_eid = e.id;
    }

    console.log(edge_list);
    return { graph: graph, current_edgeid: curr_eid, voltage_edgeid: vol_eid };
}

function getFullGraphVoltageVoltage() {
    edge_cnt = 0;
    var graph = [];
    edge_list = [];
    for (let i = 0; i <= MaxNodeNum; i++) {
        graph[i] = [];
    }

    //加電供
    let e = new Edge(0, 1, "voltage source", voltage1);
    edge_list.push(e);
    graph[0].push(e);
    graph[1].push(e);

    e = new Edge(2, 3, "voltage source", voltage2);
    edge_list.push(e);
    graph[2].push(e);
    graph[3].push(e);

    return getFullGraph(graph);
}


let equations = [];
let equation_cnt = 0;
let vis_edge = [];
let path = [];

//challenge : v0 不能給變數當電流，但連接時要當有連到
function find_loop(goal, node, graph, loop_length) {
    if (loop_length != 0 && goal == node) {
        //find loop
        // console.log("loop:");
        // for (let i = 0; i < loop_length; i++) {
        //     console.log(path[i].edgeid, path[i].par);
        // }
        equations[equation_cnt] = [];
        for (let j = 0; j <= edge_cnt; j++) {
            equations[equation_cnt][j] = 0;
        }
        for (let j = 0; j < loop_length; j++) {
            equations[equation_cnt][path[j].edgeid] += path[j].par;
        }
        equation_cnt++;
        return;
    }

    for (let i = 0; i < graph[node].length; i++) {
        let edge = graph[node][i];
        if (vis_edge[edge.id] == 0) {
            vis_edge[edge.id] = 1;
            if (edge.type == "voltage source") {
                path[loop_length] = { edgeid: edge_cnt, par: edge.get_par(node) };
                find_loop(goal, edge.go_next(node), graph, loop_length + 1);
            } else if(edge.type == "current source"){
                let _par = 1;
                if(node != 0 && node != 2){
                    _par *= -1;
                }
                path[loop_length] = {edgeid:edge.id, par:_par};
                find_loop(goal, edge.go_next(node), graph, loop_length + 1);
            } else {
                path[loop_length] = { edgeid: edge.id, par: edge.get_par(node) };
                find_loop(goal, edge.go_next(node), graph, loop_length + 1);
            }
            vis_edge[edge.id] = 0;
        }
    }
}

function equationVoltageVoltage() {
    let FG = getFullGraphVoltageVoltage();
    graph = FG.graph;
    equations = [];
    equation_cnt = 0;
    vis_edge = [];
    path = [];

    for (let i = 0; i < MaxNodeNum; i++) {//流入等於流出
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
            vis_edge[j] = 0;
        }
        path = [];
        find_loop(i, i, graph, 0);
    }
    for (let i = 0; i < equation_cnt; i++) {
        console.log(equations[i]);
        equations[i][edge_cnt] *= -1;
    }
    let gua = new GuassionElimination(equation_cnt, edge_cnt, equations);
    let x = gua.Gaussian_Jordan_elimination();
    console.log(x);
    return { FullGraph: FG, ans: x };

}

const WAVE_DATA_COUNT = 1000;

class WaveGenerator{
    constructor(){
        this._frequency = 0;
        this._amplitude = 1;
        this._inv = 1;
        this._offset = 0;
        this._cycle = 100000;
        this._type = "";
    }
    static get square_wave(){
        return "square_wave";
    }
    static get sin_wave(){
        return "sin_wave";
    }
    static get triangle_wave(){
        return "triangle_wave";
    }
    set_frequency(freq_val){
        this._frequency = freq_val / 1000.0       //調參
        //this._frequency = freq_val
        this._cycle = 1 / this._frequency
    }
    set_amplitude(val){
        this._amplitude = val
    }
    set_inv(val){
        this._inv = val
    }
    set_offset(val){
        this._offset = val
    }
    set_type(val){
        this._type = val
    }
    get frequency(){
        return this._frequency;
    }
    get amplitude(){
        return this._amplitude;
    }
    get type(){
        return this._type;
    }
    voltage(t){
        // let cycle = this._cycles[i], amplitude = this._amplitudes[i];
        // let frequency = this._frequencys[i], type = this._types[i];
        // let inv = this._inv[i];
        let cycle = this._cycle
        let amplitude = this._amplitude;
        let frequency = this._frequency;
        let inv = this._inv;
        let type = this._type
        t *= 0.003
        if(type == "square_wave"){
            let pos = 1.0 * t - cycle * Math.floor(t / cycle);
            if(pos < cycle / 2){
                return inv * amplitude;
            }else{
                return inv * -amplitude;
            }
        }else if(type == "sin_wave"){
            return inv * amplitude * Math.sin(2*Math.PI*frequency * t);
        }else if(type == "triangle_wave"){
            let pos = t - cycle * Math.floor(t / cycle);
            if(pos < cycle/4){
                return inv * (pos * 4 / cycle * amplitude);
            }else if(pos < cycle / 2){
                pos -= cycle / 4;
                return inv * (amplitude - pos * 4 / cycle * amplitude);
            }else if(pos < 3 * cycle/4){
                pos -= cycle / 2;
                return inv * (- pos * 4 / cycle * amplitude);
            }else{
                pos -= cycle*3 / 4;
                return inv * (-amplitude + pos * 4 / cycle * amplitude);
            }
        }
        return 0;
    }
    voltage_at(t){
        return this._offset + this.voltage(t);
    }
    
}

var wg = new WaveGenerator();

class Oscillator{
    constructor(){
        this._vertical_v = [1, 1];
        this._vertical_offset = [0, 0];
    }
    set_vertical_v(i, val){
        this._vertical_v[i] = val
    }
    set_vertical_offset(i, val){
        this._vertical_offset[i] = val
    }
    get vertical_v(){
        return this._vertical_v
    }
    get vertical_offset(){
        return this._vertical_offset
    }
    draw(datapoints0, datapoints1){
        for(let i=1;i <WAVE_DATA_COUNT;i++){
            datapoints0[i] *= this.vertical_v[0];
            datapoints0[i] += this.vertical_offset[0];

            datapoints1[i] *= this.vertical_v[1];
            datapoints1[i] += this.vertical_offset[1];
        }
        let chartStatus = Chart.getChart("oscilloscopeScreenCanvas"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const labels = [];
        for(let i=1;i<WAVE_DATA_COUNT;i++){
            labels[i] = i;
        }
        const data = {
            labels:labels,
        datasets: [
            {
                data: datapoints0,
                borderColor: 'rgb(255, 255, 0)',
                //backgroundColor: 'rgb(255, 255, 0)',
                tension: 0.4
            },
            {
                data: datapoints1,
                borderColor: 'rgb(0, 255, 0)',
                //backgroundColor: 'rgb(255, 255, 0)',
                tension: 0.4
            },
        ]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
              responsive: true,
              aspectRatio: 1.2,
              plugins: {
                legend: {
                    display: false //要不要顯示 lable
                  }
              },
              elements: {
                point:{
                    radius: 0
                }
              },
              interaction: {
                intersect: false,
              },
              scales: {
                x: {
                    display: false, //要不要顯示 x
                    ticks: {
                      color: "black", // not 'fontColor:' anymore
                      // fontSize: 18,
                      font: {
                        size: 6, // 'size' now within object 'font {}'
                      },
                    }
                  },
                y: {
                  display: false,
                  max: 4,
                  min: -4,
                  padding:5,
                  ticks: {
                    color: "black", // not 'fontColor:' anymore
                    // fontSize: 18,
                    font: {
                      size: 6, // 'size' now within object 'font {}'
                    },
                  }
                }
              }
            },
          };
        var canvas = $("#oscilloscopeScreenCanvas");
        var myChart = new Chart(canvas, config);
    }
}

var osi = new Oscillator();



function checkMeter(FG, x) {
    let result = { voltage: "", current: "" };
    for (let i = 0; i < this.n; i++) {//存答案
        if (x[i] == NaN) {
            result.voltage = "ERR";
            result.current = "ERR";
            return result;
        }
    }
    if (FG.current_edgeid != -1) {
        result.current = x[FG.current_edgeid];
    }
    if (FG.voltage_edgeid != -1) {
        result.voltage = x[FG.voltage_edgeid] * edge_list[FG.voltage_edgeid].ohm;
    }
    return result;
}

function checkResitanceBurn(x){
    //return false;
    for(let i=0; i < edge_list.length;i++){
        let e = edge_list[i];
        if(e.type == "resistance" && x[e.id] * x[e.id] * e.ohm > 0.125){
            show_error("電阻燒壞了<br> at least one resistor burned");
            return true;
        }
    }
    return false;
}


function checkCircuit() {
    let FGx = equationVoltageVoltage();
    let FG = FGx.FullGraph;
    let x = FGx.ans;
    if (abs(x[0]) <= current1.toFixed(2) && abs(x[1]) <= current2.toFixed(2)) {
        console.log("電供 case 是 voltage, voltage");
        let res_meter = checkMeter(FG, x);
        let res_power1 = (res_meter.current == "ERR" ? res_meter : {voltage:voltage1, current:x[0]})
        let res_power2 = (res_meter.current == "ERR" ? res_meter : {voltage:voltage2, current:x[1]})
        if(checkResitanceBurn(x)){
            let ERR = {voltage:"ERR", current:"ERR"}
            return {meter:ERR, power1:ERR, power2:ERR};
        }
        return {meter : res_meter, power1 : res_power1, power2 : res_power2};
    }

    //兩邊的電流有至少存在一邊超過最大電流
    show_error("電源供應器的最大電流給得太小了<br>max current is too small")
    if(current1 < current2){

    }else{

    }
    let ERR = {voltage:"ERR", current:"ERR"}
    return {meter:ERR, power1:ERR, power2:ERR};
    // FGx = equationCurrentCurrent();
    // FG = FGx.FullGraph;
    // x = FGx.ans;

}

function check() {
    show_error("");
    if(startbool == false) {
        alert("請先填寫個人資料(please submit personal information first)");
        return;
    }
    if(powersupplyOutputStatus == 0){
        show_error("記得開 output")
        return;
    }
    let res = checkCircuit();
    let va = res.meter;
    
    // 電阻燒壞檢查
    // if(res.voltage * res.current > 0.125){
    //     alert("電阻燒掉了(resistance over 0.125w)");
    //     $("#multimeter1_3").text("ERR");
    //     $("#multimeter2_3").text("ERR");
    //     return;
    // }
    
    vol1.innerHTML = res.power1.voltage == "ERR" ? res.power1.voltage : res.power1.voltage.toFixed(2)
    cur1.innerHTML = res.power1.current == "ERR" ? res.power1.current : res.power1.current.toFixed(2)
    vol2.innerHTML = res.power2.voltage == "ERR" ? res.power2.voltage : res.power2.voltage.toFixed(2)
    cur2.innerHTML = res.power2.current == "ERR" ? res.power2.current : res.power2.current.toFixed(2)
    if (meter1_mode == 0) {
        $("#multimeter1_3").text('');
    }
    else if (va.voltage == 'ERR') {
        $("#multimeter1_3").text(va.voltage);
    }
    else if (meter1_mode == 1) {
        let v = va.voltage.toFixed(0);
        if (v > 600) v = 'OverFlow'
        $("#multimeter1_3").text(v);
    }
    else if (meter1_mode == 2) {
        let v = va.voltage.toFixed(0);
        if (v > 200) v = 'OverFlow'
        $("#multimeter1_3").text(v);
    }
    else if (meter1_mode == 3) {
        let v = va.voltage.toFixed(1);
        if (v > 20) v = 'OverFlow'
        $("#multimeter1_3").text(v);
    }
    else if (meter1_mode == 4) {
        let v = va.voltage.toFixed(2);
        if (v > 2) v = 'OverFlow'
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
        if (c > 200) c = 'OverFlow';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 2) {
        let c = va.current;
        c *= 1000;
        c = c.toFixed(2);
        if (c > 2) c = 'OverFlow';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 3) {
        let c = va.current;
        c *= 1000;
        c = c.toFixed(1);
        if (c > 20) c = 'OverFlow';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 4) {
        let c = va.current;
        c *= 1000;
        c = c.toFixed(0);
        if (c > 200) c = 'OverFlow';
        $("#multimeter2_3").text(c);
    }
    else if (meter2_mode == 5) {
        let c = va.current;
        c = c.toFixed(1);
        if (c > 10) c = 'OverFlow';
        $("#multimeter2_3").text(c);
    }
    return;
}

function undo(){
    Things = $("line");
    console.log(Things);
    console.log(Things.length);
    let target = Things.length - 1;
    pointarray = deleteRow(pointarray, pointarray.length-1);
    pointarray = deleteRow(pointarray, pointarray.length-1);
    if (Things[target].id[0] == "w") {
        $("#wireCircle1_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#wireCircle2_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#" + Things[target].id).remove();
    }

    if (Things[target].id[0] == "r") {
        $("#resistanceCircle1_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#resistanceCircle2_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#resistanceBox" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#" + Things[target].id).remove();
    }
    if (Things[target].id[0] == "i") {
        $("#inductanceCircle1_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#inductanceCircle2_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#inductanceBox" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#" + Things[target].id).remove();
    }
    if (Things[target].id[0] == "c") {
        $("#capacitanceCircle1_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#capacitanceCircle2_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#capacitanceBox" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#" + Things[target].id).remove();
    }
    if (Things[target].id[0] == "a") {
        $("#alligatorCircle1_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#alligatorCircle2_" + Things[target].id[Things[target].id.length - 2] + Things[target].id[Things[target].id.length - 1]).remove();
        $("#" + Things[target].id).remove();
        delALLalligator = null;
    }
}
function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) undo();
}

document.onkeydown = KeyPress;

function reload(){
    if(!confirm("確定要清除全部嗎？\nAre you sure to reload？")){
        return;
    }
    for(var i = 0; i < 100; i++){
        undo();
    }
}

window.onbeforeunload = () => {
    return confirm('確定要離開?')
}

function start(){
    console.log("Starting");
    startbool = true;
    let date = new Date();
    let time = String(date.getFullYear()) + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0') + ' ' + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
    $("#time1").text(time);
    $("#name2").text($("#name1")[0].value);
    $("#id2").text($("#id1")[0].value);
    $("#class2").text($("#class1")[0].value);
    $("#name1").css("display", "none");
    $("#id1").css("display", "none");
    $("#class1").css("display", "none");
    $("#submitbuttom").css("display", "none");
}

function drawWave(){

    wg.set_frequency(generator_frequency);
    wg.set_amplitude(generator_AMPL);
    wg.set_type(wave_type);
    wg.set_inv(generator_inv_on?-1:1);
    wg.set_offset(generator_offset);

    document.getElementById("demo_frequency1").value = generator_frequency;         
    document.getElementById("demo_amplitude1").value = generator_AMPL;
    document.getElementById("demo_wave_type1").value = wave_type;
    document.getElementById("demo_wave_offset1").value = generator_offset;
    document.getElementById("demo_wave_inv1").value = generator_inv_on?-1:1;
        



    const datapoints0 = [], datapoints1 = [];
    for(let i=0;i<WAVE_DATA_COUNT;i++){
        datapoints0[i] = wg.voltage_at(i);
        datapoints1[i] = wg.voltage_at(i);
    }
    console.log(datapoints0);
    console.log(datapoints1);
    console.log(osi.draw(datapoints0, datapoints1));
}


function show_error(s){
    document.querySelector("#error_message_content").innerHTML = s;
}

function pow(a, x){
    var tmp = 1;
    if(x > 0){
        for(let i = 0;i < x;i++){
            tmp *= a;
        }
    }
    else{
        x *= -1;
        for(let i = 0;i < x;i++){
            tmp /= a;
        }
    }
    return tmp;
}

function evaluate_generator_frequency(){
    generator_frequency = generator_frequency1.toFixed(1) * pow(10,generator_frequency2.toFixed(0));
    $("#generator_frequency").text(generator_frequency1.toFixed(1));
    $("#generator_frequency_menu").text("10^"+generator_frequency2.toFixed(0));
    return generator_frequency;
}

function minus_generator_frequency(){
    if(generator_frequency1 < 0.2)return;
    generator_frequency1 -= 0.1;
    evaluate_generator_frequency();
}

function add_generator_frequency(){
    if(generator_frequency1 > 2)return;
    generator_frequency1 += 0.1;
    evaluate_generator_frequency();
}

function generator_power(){
    if(generator_power_on){
        $("#generator_power").css("backgroundColor", "white");
        generator_power_on = false;
    }
    else{
        $("#generator_power").css("backgroundColor", "green");
        generator_power_on = true;
    }
}

function clear_generator_frequency(){
    $("#generator_frequency6").css("backgroundColor", "white");
    $("#generator_frequency5").css("backgroundColor", "white");
    $("#generator_frequency4").css("backgroundColor", "white");
    $("#generator_frequency3").css("backgroundColor", "white");
    $("#generator_frequency2").css("backgroundColor", "white");
    $("#generator_frequency1").css("backgroundColor", "white");
    $("#generator_frequency0").css("backgroundColor", "white");
}

function generator_frequency_6(){
    clear_generator_frequency();
    $("#generator_frequency6").css("backgroundColor", "green");
    generator_frequency2 = 6;
    evaluate_generator_frequency();
}

function generator_frequency_5(){
    clear_generator_frequency();
    $("#generator_frequency5").css("backgroundColor", "green");
    generator_frequency2 = 5;
    evaluate_generator_frequency();
}

function generator_frequency_4(){
    clear_generator_frequency();
    $("#generator_frequency4").css("backgroundColor", "green");
    generator_frequency2 = 4;
    evaluate_generator_frequency();
}

function generator_frequency_3(){
    clear_generator_frequency();
    $("#generator_frequency3").css("backgroundColor", "green");
    generator_frequency2 = 3;
    evaluate_generator_frequency();
}

function generator_frequency_2(){
    clear_generator_frequency();
    $("#generator_frequency2").css("backgroundColor", "green");
    generator_frequency2 = 2;
    evaluate_generator_frequency();
}

function generator_frequency_1(){
    clear_generator_frequency();
    $("#generator_frequency1").css("backgroundColor", "green");
    generator_frequency2 = 1;
    evaluate_generator_frequency();
}

function generator_frequency_0(){
    clear_generator_frequency();
    $("#generator_frequency0").css("backgroundColor", "green");
    generator_frequency2 = 0;
    evaluate_generator_frequency();
}

function generator_inv(){
    if(generator_inv_on){
        $("#generator_inv").css("backgroundColor", "white");
        generator_inv_on = false;
    }
    else{
        $("#generator_inv").css("backgroundColor", "green");
        generator_inv_on = true;
    }
}

function clear_generator_wave(){
    $("#generator_square").css("backgroundColor", "white");
    $("#generator_triangle").css("backgroundColor", "white");
    $("#generator_sin").css("backgroundColor", "white");
}

function generator_square(){
    clear_generator_wave();
    $("#generator_square").css("backgroundColor", "green");
    wave_type = "square_wave";
    $("#generator_wave_text").text(wave_type);
}

function generator_triangle(){
    clear_generator_wave();
    $("#generator_triangle").css("backgroundColor", "green");
    wave_type = "triangle_wave";
    $("#generator_wave_text").text(wave_type);
}

function generator_sin(){
    clear_generator_wave();
    $("#generator_sin").css("backgroundColor", "green");
    wave_type = "sin_wave";
    $("#generator_wave_text").text(wave_type);
}

function minus_generator_duty(){
    if(generator_duty < 0.55){
        return;
    }
    generator_duty -= 0.05;
}

function add_generator_duty(){
    if(generator_duty > 0.95){
        return;
    }
    generator_duty += 0.05;
}

function generator_offset_switch(){
    if(generator_offset_on){
        $("#generator_offset_switch").css("backgroundColor", "white");
        generator_offset_on = false;
    }
    else{
        $("#generator_offset_switch").css("backgroundColor", "green");
        generator_offset = 0;
        generator_offset_on = true;
    }
}

function minus_generator_offset(){
    if(generator_offset < -30){
        return;
    }
    generator_offset -= 1;
}

function add_generator_offset(){
    if(generator_offset > 30){
        return;
    }
    generator_offset += 1;
}

function evaluate_generator_AMPL(){
    generator_AMPL = generator_AMPL_base * pow(10, generator_AMPL_pow);
}

function generator_AMPL1(){
    if(generator_AMPL1_on){
        generator_AMPL_pow += 1;
        $("#generator_AMPL1").css("backgroundColor", "white");
        generator_AMPL1_on = false;
    }
    else{
        generator_AMPL_pow -= 1;
        $("#generator_AMPL1").css("backgroundColor", "green");
        generator_AMPL1_on = true;
    }
    evaluate_generator_AMPL();
}

function generator_AMPL_switch(){
    if(generator_AMPL2_on){
        generator_AMPL_pow += 1;
        $("#generator_AMPL_switch").css("backgroundColor", "white");
        generator_AMPL2_on = false;
    }
    else{
        generator_AMPL_pow -= 1;
        $("#generator_AMPL_switch").css("backgroundColor", "green");
        generator_AMPL2_on = true;
    }
    evaluate_generator_AMPL();
}

function minus_generator_AMPL(){
    if(generator_AMPL_base > 1){
        generator_AMPL_base -= 1;
    }
    evaluate_generator_AMPL();
}

function add_generator_AMPL(){
    if(generator_AMPL_base < 14){
        generator_AMPL_base += 1;
    }
    evaluate_generator_AMPL();
}
function generator_output_switch(){
    if(generator_output_on){
        $("#generator_output_switch").css("backgroundColor", "white");
        generator_output_on = false;
    }
    else{
        $("#generator_output_switch").css("backgroundColor", "green");
        generator_output_on = true;
        drawWave()
    }
}

function minus_vertical_v_outer1(){
    osi.set_vertical_v(0, osi.vertical_v[0] - 0.1)
}
function add_vertical_v_outer1(){
    osi.set_vertical_v(0, osi.vertical_v[0] + 0.1)
}
function minus_vertical_v_outer2(){
    osi.set_vertical_v(1, osi.vertical_v[1] - 0.1)
}
function add_vertical_v_outer2(){
    osi.set_vertical_v(1, osi.vertical_v[1] + 0.1)
}

function minus_vertical_position1(){
    osi.set_vertical_offset(0, osi.vertical_offset[0] - 0.1)
}
function add_vertical_position1(){
    osi.set_vertical_offset(0, osi.vertical_offset[0] + 0.1)
}
function minus_vertical_position2(){
    osi.set_vertical_offset(1, osi.vertical_offset[1] - 0.1)
}
function add_vertical_position2(){
    osi.set_vertical_offset(1, osi.vertical_offset[1] + 0.1)
}