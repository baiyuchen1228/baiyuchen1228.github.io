
var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID

var startbool = false;

var meter1_mode = 0;
var meter2_mode = 0;
const meter_1_mode = [0, 1, 2, 3, 4];
const meter_2_mode = [0, 1, 2, 3, 4, 5];
const meter_1_Mode = ['關機', '600直流V', '200直流V', '20直流V', '2直流V'];
const meter_2_Mode = ['Hz', '200u直流A', '2m直流A', '20m直流A', '200m直流A', '10直流A'];

const colorlist = ['Red', 'DarkRed', 'FireBrick', 'LightCoral', 'OrangeRed', 'Chocolate', 'Black', 'Indigo', 'Navy', 'Black', 'DeepSkyBlue', 'Brown', 'DarkRed', 'Blue', 'Magenta', 'Cyan', 'Lime', 'Orange', 'Purple', 'SkyBlue', 'Indigo', 'Fuchsia', 'DarkCyan', 'Olive', 'SeaGreen', 'Goldenrod'];
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
var resistanceOn = 1;
var inductanceNo = 1;
var inductanceOn = 1;
var alligatorNo = 1;
var capacitanceNo = 1;
var capacitanceOn = 1;
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
var generator_offset = 0;
var generator_AMPL2_on = false;
var generator_AMPL = 1; // 1 * 10 ^ 0
var generator_AMPL_base = 0; 
var generator_AMPL_pow = 0;
var generator_output_on = false;





function turnOffMode() {
    check();
    //if (drawResistance == 1) {
        if (resistanceOn == 1) {
            $this = $("#addResistance");
            $this.css('background-color', 'white');
        }
        else{
            $this = $("#addResistance");
            $this.css('background-color', 'gray');
        }
        drawResistance = 0;
    //}
    //else if (deletemode == 1) {
        $this = $("#del");
        $this.css('background-color', 'white');
        deletemode = 0;
        delALLalligator = null;
    //}
    //else if (drawWire == 1) {
        $this = $("#addWire");
        $this.css('background-color', 'white');
        drawWire = 0;
    //}
    //else if (drawInductance == 1) {
        if (inductanceOn == 1) {
            $this = $("#addInductance");
            $this.css('background-color', 'white');
        }
        else{
            $this = $("#addInductance");
            $this.css('background-color', 'gray');
        }
        drawInductance = 0;
    //}
    //else if (drawCapacitance == 1) {
        if (capacitanceOn == 1) {
            $this = $("#addCapacitance");
            $this.css('background-color', 'white');
        }
        else{
            $this = $("#addCapacitance");
            $this.css('background-color', 'gray');
        }
        drawCapacitance = 0;
    //}
    //else if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    //}
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
            x1 -= 100;
            x2 -= 100;
            y1 -= 420;
            y2 -= 420;
            mode = true;
        }
        if (drawResistance == 1) {
            x1 = approx_x(resistanceInitial.pageX);
            y1 = approx_x(resistanceInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 100;
            x2 -= 100;
            y1 -= 420;
            y2 -= 420;
            mode = true;
        }
        if (drawInductance == 1) {
            x1 = approx_x(inductanceInitial.pageX);
            y1 = approx_x(inductanceInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 100;
            x2 -= 100;
            y1 -= 420;
            y2 -= 420;
            mode = true;
        }
        if (drawCapacitance == 1) {
            x1 = approx_x(CapacitanceInitial.pageX);
            y1 = approx_x(CapacitanceInitial.pageY);
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x1 -= 100;
            x2 -= 100;
            y1 -= 420;
            y2 -= 420;
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
            x2 += 0;
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
        x1 -= 100;
        x2 -= 100;
        y1 -= 420;
        y2 -= 420;
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
            linestack.push("wire0"+wireNo);
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=wireCircle1_' + wireNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=wireCircle2_' + wireNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line id=wire' + wireNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            linestack.push("wire"+wireNo);
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
        x1 -= 100;
        x2 -= 100;
        y1 -= 420;
        y2 -= 420;
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
        var ohms = prompt("(輸入電阻)Enter the value of Resistance in Ohms", "Resistance in Ohms");
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
            document.getElementById('svgline').appendChild(parseSVG('<line dataohm="' + ohms + '"id=resistance0' + resistanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ohms + 'Ohms</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=resistanceBox0' + resistanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:blue; stroke:lime; stroke-width:1"><title>' + ohms + 'Ohms</title></polygon>'));
            linestack.push("resistance0"+resistanceNo);
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=resistanceCircle1_' + resistanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=resistanceCircle2_' + resistanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line dataohm="' + ohms + '"id=resistance' + resistanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ohms + 'Ohms</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=resistanceBox' + resistanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:blue; stroke:lime; stroke-width:1"><title>' + ohms + 'Ohms</title></polygon>'));
            linestack.push("resistance"+resistanceNo);
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        resistanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
        resistanceOn = 0;
        turnOffMode();
    }
    if (drawInductance == 1) {
        var inductanceFinal = e;

        x1 = approx_x(inductanceInitial.pageX);
        y1 = approx_x(inductanceInitial.pageY);
        x2 = approx_x(inductanceFinal.pageX);
        y2 = approx_x(inductanceFinal.pageY);
        x1 -= 100;
        x2 -= 100;
        y1 -= 420;
        y2 -= 420;
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
        var henry = prompt("(輸入電感單位)Enter the value of Inductance in Henry", "Inductance in Henry");
        henry = parseFloat(henry);
        if (isNaN(henry) || henry == '' || henry <= 0) {
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
            document.getElementById('svgline').appendChild(parseSVG('<line datahenry="' + henry + '"id=inductance0' + inductanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + henry + 'Henry</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=inductanceBox0' + inductanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,215,0); stroke:black; stroke-width:1"><title>' + henry + 'Henry</title></polygon>'));
            linestack.push("inductance0"+inductanceNo);
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=inductanceCircle1_' + inductanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=inductanceCircle2_' + inductanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line datahenry="' + henry + '"id=inductance' + inductanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + henry + 'Henry</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=inductanceBox' + inductanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,215,0); stroke:black; stroke-width:1"><title>' + henry + 'Henry</title></polygon>'));
            linestack.push("inductance"+inductanceNo);
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        inductanceNo++;
        colorNo = (colorNo + 1) % colorlist.length;
        inductanceOn = 0;
        turnOffMode();
    }
    if (drawCapacitance) {
        var CapacitanceFinal = e;

        x1 = approx_x(CapacitanceInitial.pageX);
        y1 = approx_x(CapacitanceInitial.pageY);
        x2 = approx_x(CapacitanceFinal.pageX);
        y2 = approx_x(CapacitanceFinal.pageY);
        x1 -= 100;
        x2 -= 100;
        y1 -= 420;
        y2 -= 420;
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
        var ufarad = prompt("(輸入電容單位)Enter the value of Capacitance in micro-Farad", "Capacitance in micro-Farad");
        ufarad = parseFloat(ufarad);
        if (isNaN(ufarad) || ufarad == '' || ufarad <= 0) {
            alert("(非正常數值)Invalid value of capacitance!");
            return;
        }
        ufarad = ufarad / 1e6;
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
            document.getElementById('svgline').appendChild(parseSVG('<line dataufarad="' + ufarad + '"id=capacitance0' + capacitanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ufarad * 1e6 + 'uFarad</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=capacitanceBox0' + capacitanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,0,0); stroke:black; stroke-width:1"><title>' + ufarad * 1e6 + 'uFarad</title></polygon>'));
            linestack.push("capacitance0"+capacitanceNo);
        }
        else {
            document.getElementById('svgline').appendChild(parseSVG('<circle id=capacitanceCircle1_' + capacitanceNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<circle id=capacitanceCircle2_' + capacitanceNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<line dataufarad="' + ufarad + '"id=capacitance' + capacitanceNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:2"><title>' + ufarad * 1e6 + 'uFarad</title></line>'));
            document.getElementById('svgline').appendChild(parseSVG('<polygon id=capacitanceBox' + capacitanceNo + ' points="' + rectX1 + ',' + rectY1 + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX3 + ',' + rectY3 + ' ' + rectX4 + ',' + rectY4 + '" style="fill:rgb(255,0,0); stroke:black; stroke-width:1"><title>' + ufarad * 1e6 + 'uFarad</title></polygon>'));
            linestack.push("capacitance"+capacitanceNo);
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2, y2]);
        capacitanceNo++;
        capacitanceOn = 0;
        colorNo = (colorNo + 1) % colorlist.length;
        turnOffMode();
    }
    if (drawAlligator == 1) {
        var AlligatorFinal = e;

        x1 = AlligatorX1;
        y1 = AlligatorY1;
        x2 = approx_x(AlligatorFinal.pageX);
        y2 = approx_x(AlligatorFinal.pageY);
        x2 += 0;
        for (let i = 0; i < pointarray.length; i++) {
            if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 - 100 == pointarray[i][0] && y2 - 420 == pointarray[i][1])) {
                alert("(不能在同一點畫線)It is meaningless to insert two wire to the same point.");
                return;
            }
        }
        if (x1 == 0 || y1 == 0) {
            alert('(請先點按鈕)please click button first');
            return;
        }
        // console.log(x2,y2);
        if (y2 < 445 || y2 > 765 || x2 < 145 || x2 > 405) {
            if(x2 == 665 && y2 == 525 && (x1 == 1020 || x1 == 1350) && y1 == 530){
                if(x1 == 1020){
                    osi.set_init(1);
                }else{
                    osi.set_init(2);
                }
                // osi.draw();
            }
            else{
                alert('(請畫在麵包版上)please draw on breadboard');
                return;
            }
        }
        if (x1 == x2 && y1 == y2) {
            alert("(不能在同一點畫線)It is meaningless to insert both the ends of wire to the same point.");
            return;
        }
        if (alligatorNo < 10) {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_0' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_0' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator0' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px;"/>'));
            if((x1 == 1020 || x1 == 1350) && y1 == 530){
                linestack.push("aalligator0"+alligatorNo);
            }
            else{
                linestack.push("alligator0"+alligatorNo);
            }
        }
        else {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px;"/>'));
            if((x1 == 1020 || x1 == 1350) && y1 == 530){
                linestack.push("aalligator"+alligatorNo);
            }
            else{
                linestack.push("alligator"+alligatorNo);
            }
        }
        pointarray.push([x1, y1]);
        pointarray.push([x2-100, y2-420]);
        alligatorNo++;
        AlligatorInitial = null;
        colorNo = (colorNo + 1) % colorlist.length;
        AlligatorX1 = 0;
        AlligatorY1 = 0;
        // toggleAlligatorButton();
        // turnOffMode();
    }
    if (deletemode == 1) {
        //console.log(delIni);

        var delFin = e;
        //console.log(delFin);
        x1 = approx_x(delIni.pageX);
        y1 = approx_x(delIni.pageY);
        x2 = approx_x(delFin.pageX);
        y2 = approx_x(delFin.pageY);
        x1 -= 100;
        x2 -= 100;
        y1 -= 420;
        y2 -= 420;
        var id;
        Things = $("line");
        for (var i = Things.length - 1; i >= 0; i--) {
            if (Things[i].x1.baseVal.value == x1 && Things[i].y1.baseVal.value == y1) {
                for (let j = 0; j < pointarray.length; j++) {
                    if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                        // pointarray = deleteRow(pointarray, j);
                        pointarray[j] = [0,0];
                    }
                }
                for (let j = 0; j < pointarray.length; j++) {
                    if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                        // pointarray = deleteRow(pointarray, j);
                        pointarray[j] = [0,0];
                    }
                }
                pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
                pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
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
                    resistanceOn = 1;
                }
                if (Things[i].id[0] == "i") {
                    $("#inductanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#inductanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#inductanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#" + Things[i].id).remove();
                    inductanceOn = 1;
                }
                if (Things[i].id[0] == "c") {
                    $("#capacitanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#capacitanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#capacitanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#" + Things[i].id).remove();
                    capacitanceOn = 1;
                }
                if (Things[i].id[0] == "L") {

                    $("#LEdcircle" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#" + Things[i].id).remove();

                }
                check();
                turnOffMode();
                return;
            }
            if (Things[i].x2.baseVal.value == x1 && Things[i].y2.baseVal.value == y1) {
                for (let j = 0; j < pointarray.length; j++) {
                    if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                        // pointarray = deleteRow(pointarray, j);
                        pointarray[j] = [0,0];
                    }
                }
                for (let j = 0; j < pointarray.length; j++) {
                    if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                        // pointarray = deleteRow(pointarray, j);
                        pointarray[j] = [0,0];
                    }
                }
                //console.log(Things[i].id[0]);
                pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
                pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
                if (Things[i].id[0] == "w") {
                    $("#wireCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#wireCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#" + Things[i].id).remove();
                }

                if (Things[i].id[0] == "r") {
                    resistanceOn = 1;
                    $("#resistanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#resistanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#resistanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#" + Things[i].id).remove();
                }
                if (Things[i].id[0] == "i") {
                    inductanceOn = 1;
                    $("#inductanceCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#inductanceCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#inductanceBox" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                    $("#" + Things[i].id).remove();
                }
                if (Things[i].id[0] == "c") {
                    capacitanceOn = 1;
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
                check();
                turnOffMode();
                return;
            }
        }
        if (delALLalligator != null) {
            x1 = delALLalligator[0];
            y1 = delALLalligator[1];
            if(osi._init == 1 && x1 == 1020 && y1 == 530){
                osi.set_init(0);
            }
            if(osi._init == 2 && x1 == 1350 && y1 == 530){
                osi.set_init(0);
            }
            x2 += 100;
            y2 += 420;
            for (var i = Things.length - 1; i >= 0; i--) {
                if (Things[i].x1.baseVal.value == x1 && Things[i].y1.baseVal.value == y1) {
                    for (let j = 0; j < pointarray.length; j++) {
                        if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
                            // pointarray = deleteRow(pointarray, j);
                            pointarray[j] = [0,0];
                        }
                    }
                    for (let j = 0; j < pointarray.length; j++) {
                        if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
                            // pointarray = deleteRow(pointarray, j);
                            pointarray[j] = [0,0];
                        }
                    }
                    pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
                    pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
                    if (Things[i].id[0] == "a") {
                        $("#alligatorCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#alligatorCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                        delALLalligator = null;
                    }
                    check();
                    turnOffMode();
                    return;
                }
            }
        }
    }
    //console.log(pointarray);
    // check();
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
    if (capacitanceOn == 0) return;
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
    if (inductanceOn == 0) return;
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
        { x: 430, y: 400 }, { x: 480, y: 400 },
        { x: 1020, y: 530 }, { x: 1070, y: 530 },
        { x: 1350, y: 530 }, { x: 1390, y: 530 },
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
    return wiresOut;
}

function getAlligator() {
    //find all alligators in the html
    var alligators = $("line[id^='alligator']");
    let offsetX = 100;//550;
    let offsetY = 420;//300;
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
        r.val = math.complex(parseInt(r.val), 0);
        if (r.val == NaN) {
            alert("電阻不可以是小數");
        }
    }
    return resistanceOut;
}

function getCapacitances(omega) {

    

    //find all resistance in the html
    var capacitances = $("line[id^='capacitance']");
    var capacitanceOut = $.map(capacitances, function (capacitance) {
        var rval = $("#" + capacitance.id).attr("dataufarad");
        return {

            id: capacitance.id,
            val: rval,
            x1: capacitance.x1.baseVal.value,
            y1: capacitance.y1.baseVal.value,
            x2: capacitance.x2.baseVal.value,
            y2: capacitance.y2.baseVal.value,
            node1: findNodeNum(capacitance.x1.baseVal.value, capacitance.y1.baseVal.value),
            node2: findNodeNum(capacitance.x2.baseVal.value, capacitance.y2.baseVal.value),
        };
    });

    for (let i = 0; i < capacitanceOut.length; i++) {
        var r = capacitanceOut[i];
        r.val = parseFloat(r.val);
        r.val = math.complex(0, -1/omega/r.val);
    }
    return capacitanceOut;
}

function getInductances(omega) {



    //find all resistance in the html
    var inductances = $("line[id^='inductance']");
    var inductanceOut = $.map(inductances, function (inductance) {
        var rval = $("#" + inductance.id).attr("datahenry");
        return {

            id: inductance.id,
            val: rval,
            x1: inductance.x1.baseVal.value,
            y1: inductance.y1.baseVal.value,
            x2: inductance.x2.baseVal.value,
            y2: inductance.y2.baseVal.value,
            node1: findNodeNum(inductance.x1.baseVal.value, inductance.y1.baseVal.value),
            node2: findNodeNum(inductance.x2.baseVal.value, inductance.y2.baseVal.value),
        };
    });

    for (let i = 0; i < inductanceOut.length; i++) {
        var r = inductanceOut[i];
        r.val = parseFloat(r.val);
        r.val = math.complex(0, omega * r.val);
    }
    return inductanceOut;
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
        if(this._node1 != node && this._node2 != node){
            return -1;
        }
        if (this._node1 == node) {
            return this._node2;
        }
        return this._node1;
    }
    get_par(node) {
        if (this._node1 == node) {
            return this._ohm;
        }
        return this._ohm.mul(math.complex(-1, 0));
    }
}
var debug = 1;
var test = 0;
class GuassionElimination {
    constructor(R, C, A) {
        this.m = R;
        this.n = C;
        this.M = A;
    }

    // row operation 的加法，把一行乘一個數字加到另一行
    add(add_index, added_index, scalar) {
        for (let i = 0; i <= this.n; i++) {
            this.M[added_index][i] = this.M[added_index][i].add(this.M[add_index][i].mul(scalar));
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
            // if(this.M[index][i] == 0)continue
            this.M[index][i] = this.M[index][i].mul(scalar);
        }
    }

    Gaussian_Jordan_elimination() {
        let single = [];
        
        for (let i = 0; i < this.n; i++) {//Gaussian 下三角是0，且對角線是1
            if (math.isZero(this.M[i][i])) {
                for (let j = i + 1; j < this.m; j++) {// go down to find the not zero value
                    if (!math.isZero(this.M[j][i])) {
                        this.swap(i, j);
                        break;
                    }
                }
            }
            if (math.isZero(this.M[i][i])) {
                console.log("無唯一解/無解", i);
                single.push(i);
                continue;
            }
            
            this.multiple(i, math.complex(1.0, 0).div(this.M[i][i]));//把開頭變成1
            if(test){this.multiple(i, math.complex(1.0, 0).div(this.M[i][i]));}//把開頭變成1
            for (let j = i + 1; j < this.m; j++) {// elmination 往下把同column中所有非0的值消成0
                this.add(i, j, math.complex(-1.0, 0).mul(this.M[j][i]));
                if(test){this.add(i, j, math.complex(-1.0, 0).mul(this.M[j][i]));}
            }

        }


        for (let i = this.n - 1; i >= 0; i--) {//Jordan把上三角變0
            for (let j = 0; j < i; j++) {// 往上把同column中所有非0的值消成0
                //if(math.isZero(this.M[i][i])){continue}
                this.add(i, j, math.complex(-1.0, 0).mul(this.M[j][i]));
            }
        }

        //after guassian elimination
        //console.log("Guassian Elimination")
    
        //檢查是不是無解
        if(debug){
            for(let i=this.n;i<this.m;i++){
                if(this.M[i][this.n].re > 1e-9 || this.M[i][this.n].re < -1e-9){
                    //console.log("無解");
                    show_error("可能短路了<br> short!")
                    show_error("i 是" + i)
                    let x = [];
                    for (let i = 0; i < this.n; i++) {//存答案
                        x[i] = math.complex(0, 0);
                    }
                    return x;
                }
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

function getFullGraph(graph, meter_idx, omega, checkUser) {

    let wires = getWires();
    for (let i = 0; i < wires.length; i++) {
        let wire = wires[i];
        let e = new Edge(wire.node1, wire.node2, "wire", math.complex(1, 0));
        edge_list.push(e);
        graph[wire.node1].push(e);
        graph[wire.node2].push(e);
    }

    let alligators = getAlligator();
    for (let i = 0; i < alligators.length; i++) {
        let alli = alligators[i];
        if(meter_idx == 0 && (alli.node1 == 4 || alli.node1 == 5)){
           continue;
        }
        if(meter_idx == 1 && (alli.node1 == 2 || alli.node1 == 3)){
            continue;
         }
        let e = new Edge(alli.node1, alli.node2, "wire", math.complex(1, 0));
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

    let capacitances = getCapacitances(omega);
    for (let i = 0; i < capacitances.length; i++) {
        let r = capacitances[i];
        let e = new Edge(r.node1, r.node2, "capacitance", r.val);
        edge_list.push(e);
        graph[r.node1].push(e);
        graph[r.node2].push(e);
    }

    let inductances = getInductances(omega);
    for (let i = 0; i < inductances.length; i++) {
        let r = inductances[i];
        let e = new Edge(r.node1, r.node2, "inductance", r.val);
        edge_list.push(e);
        graph[r.node1].push(e);
        graph[r.node2].push(e);
    }

    if(checkUser == false){   //接地要 short
        tmp = new Edge(3, 5, "wire", math.complex(0, 0))
        edge_list.push(tmp);
        graph[3].push(tmp);
        graph[5].push(tmp);
    } 


    //加電壓計
    if(meter_idx == 0){
        if(checkUser == false){ //接地要 short
            let tmp = new Edge(1, 3, "wire", math.complex(0, 0));
            edge_list.push(tmp);
            graph[1].push(tmp);
            graph[3].push(tmp);
        }

        let e = new Edge(3, 2, "voltmeter", math.complex(100000000, 0));
        edge_list.push(e);
        graph[2].push(e);
        graph[3].push(e);
        return { graph: graph, voltage_edgeid: e.id};
    }
    else{
        if(checkUser == false){ //接地要 short
            tmp = new Edge(1, 5, "wire", math.complex(0, 0))
            edge_list.push(tmp);
            graph[1].push(tmp);
            graph[5].push(tmp);
        }

        let e = new Edge(5, 4, "voltmeter", math.complex(100000000, 0));
        edge_list.push(e);
        graph[4].push(e);
        graph[5].push(e);
        return { graph: graph, voltage_edgeid: e.id};
    }
    
}

function getFullGraphVoltageVoltage(meter_idx, omega, checkUser) {
    edge_cnt = 0;
    var graph = [];
    edge_list = [];
    for (let i = 0; i <= MaxNodeNum; i++) {
        graph[i] = [];
    }

    // if(checkUser == false){
    //加 wave generator
    let e = new Edge(0, 1, "voltage source", math.complex(1, 0));
    edge_list.push(e);
    graph[0].push(e);
    graph[1].push(e);
    // }


    return getFullGraph(graph, meter_idx, omega, checkUser);
}


let equations = [];
let equation_cnt = 0;
let vis_edge = [];
let path = [];

//challenge : v0 不能給變數當電流，但連接時要當有連到
function find_loop(goal, node, graph, loop_length) {
    if (loop_length != 0 && goal == node) {
        equations[equation_cnt] = [];
        for (let j = 0; j <= edge_cnt; j++) {
            equations[equation_cnt][j] = math.complex(0, 0);
        }
        for (let j = 0; j < loop_length; j++) {
            equations[equation_cnt][path[j].edgeid] = equations[equation_cnt][path[j].edgeid].add(path[j].par);
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
                let _par = math.complex(1, 0);
                if(node != 0 && node != 2){
                    _par = _par.mul(math.complex(-1, 0));
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

function equationVoltageVoltage(meter_idx, omega) {
    let FG = getFullGraphVoltageVoltage(meter_idx, omega, false);
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
            equations[equation_cnt][j] = math.complex(equations[equation_cnt][j]);
        }
        for (let j = 0; j < graph[i].length; j++) {
            let edge = graph[i][j];
            if (edge.node1 == i) {
                //流出
                equations[equation_cnt][edge.id] = math.complex(1, 0);
            } else {
                equations[equation_cnt][edge.id] = math.complex(-1, 0);
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
    //console.log("show equation in equationVoltageVoltage=====================")
    for (let i = 0; i < equation_cnt; i++) {
        equations[i][edge_cnt].mul(math.complex(-1, 0));
    }
    
    let gua = new GuassionElimination(equation_cnt, edge_cnt, equations);
    let x = gua.Gaussian_Jordan_elimination();
    return { FullGraph: FG, ans: x };

}



function testGuassion(){
    let ohmaga = 100;
    let ohm = 10;
    let fala = 0.012;
    let homos = 8;
    let voltage = 13;

    edge_cnt = 0;
    var graph = [];
    edge_list = [];
    for (let i = 0; i <= MaxNodeNum; i++) {
        graph[i] = [];
    }

    let e = new Edge(21, 22, "resistance", math.complex(ohm, 0));
    edge_list.push(e);
    graph[21].push(e);
    graph[22].push(e);

    e = new Edge(22, 23, "capacitance", math.complex(0, -1/ohmaga / fala));
    edge_list.push(e);
    graph[22].push(e);
    graph[23].push(e);

    e = new Edge(23, 24, "inductance", math.complex(0, ohmaga * homos));
    edge_list.push(e);
    graph[23].push(e);
    graph[24].push(e);

    e = new Edge(21, 24, "voltage source", math.complex(voltage, 0));
    edge_list.push(e);
    graph[21].push(e);
    graph[24].push(e);

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
            equations[equation_cnt][j] = math.complex(equations[equation_cnt][j]);
        }
        
        for (let j = 0; j < graph[i].length; j++) {
            let edge = graph[i][j];
            if (edge.node1 == i) {
                //流出
                equations[equation_cnt][edge.id] = math.complex(1, 0);
            } else {
                equations[equation_cnt][edge.id] = math.complex(-1, 0);
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
        equations[i][edge_cnt].mul(math.complex(-1, 0));
    }

    let gua = new GuassionElimination(equation_cnt, edge_cnt, equations);
    let x = gua.Gaussian_Jordan_elimination();
}

function checkConnected(){
    let res = {voltage1:1, voltage2:1}
    let FG = getFullGraphVoltageVoltage(0, 1, true);
    graph = FG.graph;
    let top = 0;
    let stack = [];
    let vis = [];
    for(let i = 0;i<MaxNodeNum;i++){
        vis[i] = 0;
    }
    //Are 2 and 3 connected?
    stack[top++] = 2;
    while(top != 0){
        let node = stack[--top];
        for (let j = 0; j < graph[node].length; j++) {
            let edge = graph[node][j];
            if (edge.go_next(2) == 3 || edge.go_next(4) == 5){
                continue;
            }
            if(vis[edge.go_next(node)] == 0){
                vis[edge.go_next(node)] = 1;
                stack[top++] = edge.go_next(node);
            }
        }
    }
    if(vis[3] == 0){
        res.voltage1 = 0;
    }

    FG = getFullGraphVoltageVoltage(1, 1, true);
    graph = FG.graph;
    for(let i = 0;i<MaxNodeNum;i++){
        vis[i] = 0;
    }

    //Are 4 and 5 connected?
    stack[top++] = 4;
    while(top != 0){
        let node = stack[--top];
        for (let j = 0; j < graph[node].length; j++) {
            let edge = graph[node][j];
            if (edge.go_next(2) == 3 || edge.go_next(4) == 5){
                continue;
            }
            if(vis[edge.go_next(node)] == 0){
                vis[edge.go_next(node)] = 1;
                stack[top++] = edge.go_next(node);
            }
        }
    }
    if(vis[5] == 0){
        res.voltage2 = 0;
    }
    return res;
}


class WaveGenerator{
    constructor(){
        this._frequency = 0;
        this._amplitude = 0;
        this._inv = 1;
        this._offset = 0;
        this._cycle = 100000;
        this._type = "";
        this._offset_on = false;
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
        this._frequency = freq_val / 1000.0;       //調參
        //this._frequency = freq_val
        this._cycle = 1 / this._frequency;
    }
    set_amplitude(val){
        this._amplitude = val;
    }
    set_inv(val){
        this._inv = val;
    }
    set_offset(val){
        this._offset = val;
    }
    set_type(val){
        this._type = val;
    }
    set_offset_on(drawing){
        if(this._offset_on){
            $("#generator_offset_switch").css("backgroundColor", "white");
            this._offset_on = false;
        }
        else{
            $("#generator_offset_switch").css("backgroundColor", "green");
            this._offset = 0;
            this._offset_on = true;
        }
        if(drawing) osi.draw();
    }
    get frequency(){
        return this._frequency;
    }
    get amplitude(){
        return this._amplitude;
    }
    get inv(){
        return this._inv;
    }
    get offset(){
        return this._offset;
    }
    get type(){
        return this._type;
    }
    get offset_on(){
        return this._offset_on;
    }
    calculate_phase(res, index){
        let a,b;
        let phase;
        if(index == 0){
            a = res.voltage1.re;
            b = res.voltage1.im;
        }
        else{
            a = res.voltage2.re;
            b = res.voltage2.im;
        }
        if(a > 0){
            phase = Math.atan(b/a);
        }
        else if(a < 0){
            phase = Math.atan(b/a);
            phase += Math.PI;
        }
        else{ // a == 0
            if(b > 0){
                phase = math.PI / 2;
            }
            if(b <= 0){
                phase = math.PI * 3 / 2;
            }
        }
        if(phase < 0){
            phase += 2 * math.PI;
        }
        return phase;
    }
    calculate_amplitude(res, index){
        let a,b;
        let amplitude;
        if(index == 0){
            a = res.voltage1.re;
            b = res.voltage1.im;
        }
        else{
            a = res.voltage2.re;
            b = res.voltage2.im;
        }
        amplitude =  math.sqrt(a * a + b * b);
        return amplitude;
    }
    voltage(t, coefficient, omega, phase, amplitude){
        // let cycle = this._cycles[i], amplitude = this._amplitudes[i];
        // let frequency = this._frequencys[i], type = this._types[i];
        // let inv = this._inv[i];
        let cycle = this._cycle;
        let inv = this._inv;
        let type = this._type;
        t *= 0.003;
        if(type == "square_wave"){
            let result = 0;
            result += amplitude * (1 / coefficient) * math.sin(omega * t + phase);
            result *= (4 / Math.PI);
            result *= inv;
            return result;
        }
        else if(type == "sin_wave"){
            return inv * amplitude * Math.sin(omega * t + phase);
        }
        else if(type == "triangle_wave"){
            let result = 0;
            result += amplitude * (1 / coefficient) * math.sin(omega * t + phase);
            result *= (8 / Math.PI / Math.PI);
            result *= inv;
            return result;
        }
        return 0;
    }
    voltage_at(t, coefficient, omega, phase, amplitude){
        //if(amplitude > 5) return 0;
        // if(generator_offset_on){
        //     return this._offset + this.voltage(t, coefficient, omega, phase, amplitude);
        // }
        return this.voltage(t, coefficient, omega, phase, amplitude);
    }
    
}

var wg = new WaveGenerator();

class Oscillator{
    constructor(){
        this._power = 0;
        this._vertical_v = [1, 1];
        this._vertical_offset = [0, 0];
        this._datapoints0 = [];
        this._datapoints1 = [];
        this._time_mul = 2/300;
        this._time_offset = 0;
        this._WAVE_DATA_COUNT = 1000;
        this._vertical_AC_GND_DC = ["AC", "AC"];  //AC, GND, DC
        this._vaild = false;
        this._phasor = [];
        this._loop = 100;
        this._level = 0.05;
        this._slope = 1;
        this._reference = "CH1";
        this._show_mode = "CH1";
        this._init = false;
        this._SWP = 1;
    }
    
    set_SWP(val){
        this._SWP = val;
    }
    set_init(val){
        this._init = val;
    }
    set_slope(val){
        this._slope = val;
    }
    set_level(val){
        this._level = val;
    }
    set_refernece(val){
        this._reference = val;
    }
    set_show_mode(val){
        this._show_mode = val;
    }
    set_vertical_v(i, val){
        this._vertical_v[i] = val;
    }
    set_vertical_offset(i, val){
        this._vertical_offset[i] = val;
    }
    set_time_mul(val){
        this._time_mul = val;
    }
    set_time_offset(val){
        this._time_offset = val;
    }
    set_vertical_AC_GND_DC(i, val){
        this._vertical_AC_GND_DC[i] = val;
    }
    get init(){
        return this._init;
    }
    get slope(){
        return this._slope;
    }
    get level(){
        return this._level;
    }
    get reference(){
        return this._reference;
    }
    get show_mode(){
        return this._show_mode;
    }
    get vertical_v(){
        return this._vertical_v;
    }
    get vertical_offset(){
        return this._vertical_offset;
    }
    get time_mul(){
        return this._time_mul;
    }
    get time_offset(){
        return this._time_offset;
    }
    get vertical_AC_GND_DC(){
        return this._vertical_AC_GND_DC;
    }
    get SWP(){
        return this._SWP;
    }
    get_res(){
        let type = wg.type;
        let loop = this._loop;
        if(type == "square_wave"){
            for (let i = 0; i < loop; i++){
                let omega = (2 * i + 1) * 2 * math.PI * evaluate_generator_frequency();
                this._phasor[i] = checkCircuit(omega);
            }
        }else if(type == "sin_wave"){
            let omega = 2 * math.PI * evaluate_generator_frequency();
            this._phasor[0] = checkCircuit(omega);
        }else if(type == "triangle_wave"){
            for (let i = 0; i < loop; i++){
                let omega = (2 * i + 1) * 2 * math.PI * evaluate_generator_frequency();
                this._phasor[i] = checkCircuit(omega);
            }
        }
    }
    get_data(){
        let WAVE_DATA_COUNT = this._WAVE_DATA_COUNT * 3;
        if(this._init == 0 && this._vaild == false){
            this.get_res();
            this._vaild = true;
        }

        let tmp_wg = wg;
        if(this._init != 0){
            wg = new WaveGenerator();
            wg.set_amplitude(1);
            wg.set_frequency(1000);
            wg.set_offset_on(false);
            wg.set_offset(1);
            $("#generator_offset_switch").css("backgroundColor", "white");
            wg.set_type("square_wave");
            this._vaild = false;
            let loop = this._loop;
            for(let i=0;i<loop;i++){
                if(this._init == 1) this._phasor[i] = {voltage1:math.complex(1, 0), voltage2:math.complex(0, 0)};
                else this._phasor[i] = {voltage1:math.complex(0, 0), voltage2:math.complex(1, 0)};
            }
        }
        let type = wg.type;
        if(type == "square_wave"){
            let loop = this._loop;
            for(let j=0;j<(WAVE_DATA_COUNT);j++){
                this._datapoints0[j] = 0;
                this._datapoints1[j] = 0;
            }
            
            for (let i = 0; i < loop; i++){
                let omega = (2 * i + 1) * 2 * math.PI * wg.frequency * 1000 * this._SWP;
                let res = this._phasor[i];
                let phase0 = wg.calculate_phase(res, 0);
                let amplitude0 = wg.calculate_amplitude(res, 0);
                let phase1 = wg.calculate_phase(res, 1);
                let amplitude1 = wg.calculate_amplitude(res, 1);
                for(let j=0;j<(WAVE_DATA_COUNT);j++){
                    this._datapoints0[j] += wg.voltage_at((j + this._time_offset) * this._time_mul, 2 * i + 1, omega, phase0, amplitude0);
                    this._datapoints1[j] += wg.voltage_at((j + this._time_offset) * this._time_mul, 2 * i + 1, omega, phase1, amplitude1);
                }
            }
            for(let j=0;j<(WAVE_DATA_COUNT);j++){
                this._datapoints0[j] *= wg.amplitude;
                this._datapoints1[j] *= wg.amplitude;
                if(wg.offset_on && this.vertical_AC_GND_DC[0] == "DC"){
                    this._datapoints0[j] += wg.offset;
                }
                if(wg.offset_on && this.vertical_AC_GND_DC[1] == "DC"){
                    this._datapoints1[j] += wg.offset;
                }
            }
        }
        else if(type == "triangle_wave"){
            let loop = this._loop;
            for(let j=0;j<(WAVE_DATA_COUNT);j++){
                this._datapoints0[j] = 0;
                this._datapoints1[j] = 0;
            }
            
            for (let i = 0; i < loop; i++){
                let omega = (2 * i + 1) * 2 * math.PI * wg.frequency * 1000 * this._SWP;
                let res = this._phasor[i];
                let phase0 = wg.calculate_phase(res, 0);
                let amplitude0 = wg.calculate_amplitude(res, 0);
                let phase1 = wg.calculate_phase(res, 1);
                let amplitude1 = wg.calculate_amplitude(res, 1);
                for(let j=0;j<(WAVE_DATA_COUNT);j++){
                    this._datapoints0[j] += wg.voltage_at((j + this._time_offset) * this._time_mul, pow(-1,i) * (2 * i + 1) * (2 * i + 1), omega, phase0, amplitude0);
                    this._datapoints1[j] += wg.voltage_at((j + this._time_offset) * this._time_mul, pow(-1,i) * (2 * i + 1) * (2 * i + 1), omega, phase1, amplitude1);
                }
            }
            for(let j=0;j<(WAVE_DATA_COUNT);j++){
                this._datapoints0[j] *= wg.amplitude;
                this._datapoints1[j] *= wg.amplitude;
                if(wg.offset_on && this.vertical_AC_GND_DC[0] == "DC"){
                    this._datapoints0[j] += wg.offset;
                }
                if(wg.offset_on && this.vertical_AC_GND_DC[1] == "DC"){
                    this._datapoints1[j] += wg.offset;
                }
            }
        }
        else if(type == "sin_wave"){
            let omega = 2 * math.PI * wg.frequency * 1000 * this._SWP;
            let res = this._phasor[0];
            let phase0 = wg.calculate_phase(res, 0);
            let amplitude0 = wg.calculate_amplitude(res, 0);
            let phase1 = wg.calculate_phase(res, 1);
            let amplitude1 = wg.calculate_amplitude(res, 1);
            for(let i=0;i< (WAVE_DATA_COUNT);i++){
                this._datapoints0[i] = wg.voltage_at((i + this._time_offset) * this._time_mul, 1, omega, phase0, amplitude0);
                this._datapoints1[i] = wg.voltage_at((i + this._time_offset) * this._time_mul, 1, omega, phase1, amplitude1); 
                if(wg.offset_on && this.vertical_AC_GND_DC[0] == "DC"){
                    this._datapoints0[i] += wg.offset;
                }
                if(wg.offset_on && this.vertical_AC_GND_DC[1] == "DC"){
                    this._datapoints1[i] += wg.offset;
                }
            }
            for(let j=0;j<(WAVE_DATA_COUNT);j++){
                this._datapoints0[j] *= wg.amplitude;
                this._datapoints1[j] *= wg.amplitude;
                if(wg.offset_on && this.vertical_AC_GND_DC[0] == "DC"){
                    this._datapoints0[j] += wg.offset;
                }
                if(wg.offset_on && this.vertical_AC_GND_DC[1] == "DC"){
                    this._datapoints1[j] += wg.offset;
                }
            }
        }
        
        // 確定使用者真的有接對
        
        if(this._init == 0){
            let conn = checkConnected();
            if(conn.voltage1 == 0){
                for(let j=0;j<(WAVE_DATA_COUNT);j++){
                    this._datapoints0[j] = 0;
                }
                show_error("channel 1 is open.");
            }
            if(conn.voltage2 == 0){
                for(let j=0;j<(WAVE_DATA_COUNT);j++){
                    this._datapoints1[j] = 0;
                }
                show_error("channel 2 is open.");
            }
        }
        wg = tmp_wg;

    }
    
    power_control(){
        if(this._power == 0){
            this._power = 1;
            $("#oscilloscope_power").css("backgroundColor", "green");
        }else{
            this._power = 0;
            $("#oscilloscope_power").css("backgroundColor", "white");
        }
        check();
    }
    draw(){
        document.querySelector("#error_message_content").innerHTML = ""; //初始化 show_error
        document.getElementById("demo_frequency1").value = wg.frequency * 1000;         
        document.getElementById("demo_amplitude1").value = wg.amplitude;
        document.getElementById("demo_wave_type1").value = wg.type;
        document.getElementById("demo_wave_offset1").value = wg.offset;
        document.getElementById("demo_wave_inv1").value = wg.inv;
        
        let arrow_pos = this._level;
        if(this._reference == "CH1"){
            arrow_pos += this._vertical_offset[0];
        }else{
            arrow_pos += this._vertical_offset[1];
        }
        arrow_pos = arrow_pos * (-28) + 50;
        $("#level_show").css("top", arrow_pos.toString() + "px");
        
        this.get_data();
        let datapoints0 = [];
        let datapoints1 = [];
        let begin = this._WAVE_DATA_COUNT;
        let flag = false;
        let pre = this._datapoints0[begin] / this._vertical_v[0];
        // pre += this._vertical_offset[0];



        for(;begin < 2 * this._WAVE_DATA_COUNT && flag == false;begin++){
            let temp = 0;
            // let temp_level = this._level;
            if(this._reference == "CH1"){
                temp = this._datapoints0[begin] / this._vertical_v[0];
                // temp += this._vertical_offset[0];
            }else{
                temp = this._datapoints1[begin] / this._vertical_v[1];
                // temp += this._vertical_offset[1];
            }
            if(this._slope == 1 && pre <= this._level+0.05 && temp >= this._level-0.05){
                flag = true;
            }else if(this._slope == -1 && pre >= this._level-0.05 && temp <= this._level+0.05){
                flag = true;
            }
            pre = temp;
        }
        begin -= this._time_offset;

        if(flag == false){
            for(let i=0;i<this._WAVE_DATA_COUNT;i++){
                datapoints0[i] = 0.008 * i - 4;
                datapoints1[i] = 4 - 0.008 * i;
            }
            show_error("trigger level is out of range!");
        }else{
            for(let i=begin;i < begin + (this._WAVE_DATA_COUNT);i++){
                if(this._show_mode != 'CH2'){
                    datapoints0[i-begin] = this._datapoints0[i] / this._vertical_v[0];
                    datapoints0[i-begin] += this._vertical_offset[0];
                }else{
                    datapoints0[i-begin] = NaN;
                }

                if(this._show_mode != 'CH1'){
                    datapoints1[i-begin] = this._datapoints1[i] / this._vertical_v[1];
                    datapoints1[i-begin] += this._vertical_offset[1];
                }else{
                    datapoints1[i-begin] = NaN;
                }
            }
        }

        if(this._show_mode != "CH2" && this._vertical_AC_GND_DC[0] == "GND"){
            for(let i=begin;i < begin + (this._WAVE_DATA_COUNT);i++){
                datapoints0[i-begin] = 0;
                datapoints0[i-begin] += this._vertical_offset[0];
            }
        }else if(this._show_mode == "CH2"){
            for(let i=begin;i < begin + (this._WAVE_DATA_COUNT);i++){
                datapoints0[i-begin] = NaN;
            }
        }

        if(this._show_mode != "CH1" && this._vertical_AC_GND_DC[1] == "GND"){
            for(let i=begin;i < begin + (this._WAVE_DATA_COUNT);i++){
                datapoints1[i-begin] = 0;
                datapoints1[i-begin] += this._vertical_offset[1];
            }
        }else if(this._show_mode == "CH1"){
            for(let i=begin;i < begin + (this._WAVE_DATA_COUNT);i++){
                datapoints1[i-begin] = NaN;
            }
        }

        if(this._power == 0){
            show_error("示波器的 power 沒有打開");
            for(let i=begin;i < begin + (this._WAVE_DATA_COUNT);i++){
                datapoints0[i-begin] = NaN;
                datapoints1[i-begin] = NaN;
            }
        }


        
        let chartStatus = Chart.getChart("oscilloscopeScreenCanvas"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const labels = [];
        for(let i=0;i<(this._WAVE_DATA_COUNT);i++){
            labels[i] = i+1;
        }
        const data = {
            labels:labels,
            datasets: [
                {
                    data: datapoints1,
                    borderColor: 'rgb(255, 255, 0)',
                    //backgroundColor: 'rgb(255, 255, 0)',
                    tension: 0.4
                },
                {
                    data: datapoints0,
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
              aspectRatio: 1.25,
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



function checkMeter(x) {
    for (let i = 0; i < this.n; i++) {//存答案
        if (x[i] != x[i]) {
            return false;
        }
    }
    return true;
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


function checkCircuit(omega) {
    let res_meter = {voltage1:0, voltage2:0}
    
    let FGx = equationVoltageVoltage(0, omega);
    let FG = FGx.FullGraph;
    let x = FGx.ans;
    if(checkMeter(x)){
        res_meter.voltage1 = x[FG.voltage_edgeid].mul(edge_list[FG.voltage_edgeid].ohm);
    }

    let FGx2 = equationVoltageVoltage(1, omega);
    let FG2 = FGx2.FullGraph;
    let x2 = FGx2.ans;
    if(checkMeter(x2)){
        res_meter.voltage2 = x2[FG2.voltage_edgeid].mul(edge_list[FG2.voltage_edgeid].ohm);
    }

    if(generator_power_on == false){
        res_meter.voltage1 = math.complex(0, 0);
        res_meter.voltage2 = math.complex(0, 0);
        document.querySelector("#error_message_content").innerHTML = ""; //初始化 show_error
        show_error("波型產生器的 power 沒有打開");
        return res_meter;
    }



    // if(checkResitanceBurn(x)){
    //     res_meter.voltage1 = res_meter.voltage1 = "ERR"
    //     return {meter:ERR, power1:ERR, power2:ERR};
    // }
    document.querySelector("#error_message_content").innerHTML = ""; //初始化 show_error
    // show_error("voltage left : " + String(res_meter.voltage1.re.toFixed(5)) + ", " + String(res_meter.voltage1.im.toFixed(5)) + 
    //        "<br>voltage right : " + String(res_meter.voltage2.re.toFixed(5)) + ", " + String(res_meter.voltage2.im.toFixed(5)));
    return res_meter;

    //兩邊的電流有至少存在一邊超過最大電流
    // show_error("電源供應器的最大電流給得太小了<br>max current is too small")
    // if(current1 < current2){

    // }else{

    // }
    // let ERR = {voltage:"ERR", current:"ERR"}
    // return {meter:ERR, power1:ERR, power2:ERR};
    // FGx = equationCurrentCurrent();
    // FG = FGx.FullGraph;
    // x = FGx.ans;

}







function check() {
    document.querySelector("#error_message_content").innerHTML = ""; //初始化 show_error
    if(startbool == false) {
        alert("請先填寫個人資料(please submit personal information first)");
        return;
    }
    // if(powersupplyOutputStatus == 0){
    //     show_error("記得開 output")
    //     return;
    // }
    osi._vaild = false;
    osi.draw();
    return ;
}

linestack = [];
function undo(){
    if(linestack.length == 0){
        return;
    }
    let target = linestack.length - 1;
    pointarray = deleteRow(pointarray, pointarray.length-1);
    pointarray = deleteRow(pointarray, pointarray.length-1);
    if (linestack[target][0] == "w") {
        $("#wireCircle1_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#wireCircle2_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#" + linestack[target]).remove();
    }

    if (linestack[target][0] == "r") {
        $("#resistanceCircle1_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#resistanceCircle2_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#resistanceBox" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#" + linestack[target]).remove();
        resistanceOn = 1;
    }
    if (linestack[target][0] == "i") {
        $("#inductanceCircle1_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#inductanceCircle2_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#inductanceBox" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#" + linestack[target]).remove();
        inductanceOn = 1;
    }
    if (linestack[target][0] == "c") {
        $("#capacitanceCircle1_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#capacitanceCircle2_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#capacitanceBox" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#" + linestack[target]).remove();
        capacitanceOn = 1;
    }
    if (linestack[target][0] == "a") {
        if(linestack[target][1] == "a"){
            osi.set_init(0);
            // osi.draw();
        }
        $("#alligatorCircle1_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#alligatorCircle2_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#alligator" + + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        delALLalligator = null;
    }
    linestack.pop();
    turnOffMode();
}
function KeyPress(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) undo();
    if (evtobj.keyCode == 65) toggleAlligatorButton();
    if (evtobj.keyCode == 68) toggleDelButton();
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
    return confirm('確定要離開?');
}

function start(){
    console.log("Starting");
    osi.set_SWP(0.04 * (getRandomInteger(10) - 5) + 1);
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
    check();
}

function drawWave(){

    wg.set_frequency(generator_frequency);
    wg.set_amplitude(generator_AMPL);
    wg.set_type(wave_type);
    wg.set_inv(generator_inv_on?-1:1);
    wg.set_offset(generator_offset);
    
    osi.draw();
    //check();
}


function show_error(s){
    tmp = document.querySelector("#error_message_content").innerHTML;
    document.querySelector("#error_message_content").innerHTML = tmp + "<br>" + s;
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
    wg.set_frequency(generator_frequency1.toFixed(1) * pow(10,generator_frequency2.toFixed(0)));
    return generator_frequency;
}

function minus_generator_frequency(){
    if(generator_frequency1 < 0.2)return;
    generator_frequency1 -= 0.1;
    evaluate_generator_frequency();
    check();
}

function add_generator_frequency(){
    if(generator_frequency1 > 2)return;
    generator_frequency1 += 0.1;
    evaluate_generator_frequency();
    check();
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
    check();
}

function clear_generator_frequency(){
    $("#generator_frequency6").css("backgroundColor", "white");
    $("#generator_frequency5").css("backgroundColor", "white");
    $("#generator_frequency4").css("backgroundColor", "white");
    $("#generator_frequency3").css("backgroundColor", "white");
    $("#generator_frequency2").css("backgroundColor", "white");
    $("#generator_frequency1").css("backgroundColor", "white");
    $("#generator_frequency0").css("backgroundColor", "white");
    check();
}

function generator_frequency_6(){
    clear_generator_frequency();
    $("#generator_frequency6").css("backgroundColor", "green");
    generator_frequency2 = 6;
    evaluate_generator_frequency();
    check();
}

function generator_frequency_5(){
    clear_generator_frequency();
    $("#generator_frequency5").css("backgroundColor", "green");
    generator_frequency2 = 5;
    evaluate_generator_frequency();
    check();
}

function generator_frequency_4(){
    clear_generator_frequency();
    $("#generator_frequency4").css("backgroundColor", "green");
    generator_frequency2 = 4;
    evaluate_generator_frequency();
    check();
}

function generator_frequency_3(){
    clear_generator_frequency();
    $("#generator_frequency3").css("backgroundColor", "green");
    generator_frequency2 = 3;
    evaluate_generator_frequency();
    check();
}

function generator_frequency_2(){
    clear_generator_frequency();
    $("#generator_frequency2").css("backgroundColor", "green");
    generator_frequency2 = 2;
    evaluate_generator_frequency();
    check();
}

function generator_frequency_1(){
    clear_generator_frequency();
    $("#generator_frequency1").css("backgroundColor", "green");
    generator_frequency2 = 1;
    evaluate_generator_frequency();
    check();
}

function generator_frequency_0(){
    clear_generator_frequency();
    $("#generator_frequency0").css("backgroundColor", "green");
    generator_frequency2 = 0;
    evaluate_generator_frequency();
    check();
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
    wg.set_inv(wg.inv * (-1));
    check();
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
    wg.set_type("square_wave");
    check();
}

function generator_triangle(){
    // alert("traingle wave is unimplemented!")
    // return;
    clear_generator_wave();
    $("#generator_triangle").css("backgroundColor", "green");
    wave_type = "triangle_wave";
    $("#generator_wave_text").text(wave_type);
    wg.set_type("triangle_wave");
    check();
}

function generator_sin(){
    clear_generator_wave();
    $("#generator_sin").css("backgroundColor", "green");
    wave_type = "sin_wave";
    $("#generator_wave_text").text(wave_type);
    wg.set_type("sin_wave");
    check();
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


function minus_generator_offset(){
    if(wg.offset_on){
        if(wg.offset < -30){
            osi.draw();
            return;
        }
        wg.set_offset(wg.offset - 0.1);
        // generator_offset -= 0.1;
    }
    osi.draw();
}

function add_generator_offset(){
    if(wg.offset_on){
        if(wg.offset > 30){
            osi.draw();
            return;
        }
        wg.set_offset(wg.offset + 0.1);
        // generator_offset += 0.1;
    }
    osi.draw();
}

function evaluate_generator_AMPL(){
    wg.set_amplitude(generator_AMPL_base * pow(10, generator_AMPL_pow));
    check();
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
        generator_AMPL_base -= 0.5;
    }
    evaluate_generator_AMPL();
}

function add_generator_AMPL(){
    if(generator_AMPL_base < 14){
        generator_AMPL_base += 0.5;
    }
    evaluate_generator_AMPL();
}

function generator_output_switch(){
    if(generator_output_on)return;
    $("#generator").removeClass('generator_bg0').addClass('generator_bg1');
    generator_output_on = true;
    if(generator_output_on){
        $("#generator_output_switch").css("backgroundColor", "white");
        generator_output_on = false;
    }
    else{
        $("#generator_output_switch").css("backgroundColor", "green");
        generator_output_on = true;
        drawWave();
    }
}
function generator_drawline1() {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 430;
        AlligatorY1 = 400;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [430, 400];
    }
}
function generator_drawline2() {
    colorNo = 6;
    if (drawAlligator) {
        AlligatorX1 = 480;
        AlligatorY1 = 400;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [490, 400];
    }
}
v_outer_dis = [5,2,1,0.5,0.2,0.1,0.05,0.02,0.01];
v_outer_ind_1 = 4;
v_outer_ind_2 = 4;
function minus_vertical_v_outer1(){
    if(v_outer_ind_1 == 0) return;
    v_outer_ind_1--;
    osi.set_vertical_v(0, v_outer_dis[v_outer_ind_1]);
    let text = v_outer_dis[v_outer_ind_1] + "V";
    $("#vertical_v1").text(text);
    //check();
    osi.draw();
}
function add_vertical_v_outer1(){
    if(v_outer_ind_1 == v_outer_dis.length - 1) return;
    v_outer_ind_1++;
    osi.set_vertical_v(0, v_outer_dis[v_outer_ind_1]);
    let text = v_outer_dis[v_outer_ind_1] + "V";
    $("#vertical_v1").text(text);
    //check();
    osi.draw();
}
function minus_vertical_v_outer2(){
    if(v_outer_ind_2 == 0) return;
    v_outer_ind_2--;
    osi.set_vertical_v(1, v_outer_dis[v_outer_ind_2]);
    let text = v_outer_dis[v_outer_ind_2] + "V";
    $("#vertical_v2").text(text);
    //check();
    osi.draw();
}
function add_vertical_v_outer2(){
    if(v_outer_ind_2 == v_outer_dis.length - 1) return;
    v_outer_ind_2++;
    osi.set_vertical_v(1, v_outer_dis[v_outer_ind_2]);
    let text = v_outer_dis[v_outer_ind_2] + "V";
    $("#vertical_v2").text(text);
    //check();
    osi.draw();
}

function minus_vertical_position1(){
    osi.set_vertical_offset(0, osi.vertical_offset[0] - 0.1);
    //check();
    osi.draw();
}
function add_vertical_position1(){
    osi.set_vertical_offset(0, osi.vertical_offset[0] + 0.1);
    //check();
    osi.draw();
}
function minus_vertical_position2(){
    osi.set_vertical_offset(1, osi.vertical_offset[1] - 0.1);
    // check();
    osi.draw();
}
function add_vertical_position2(){
    osi.set_vertical_offset(1, osi.vertical_offset[1] + 0.1);
    // check();
    osi.draw();
}


time_mul_des = [500,200,100,50,20,10,5,2,1,0.5,0.2,0.1,0.05,0.02,0.01,0.005,0.002,0.001,0.0005,0.0002];
time_mul_ind = 7;

function minus_horizonal_time(){
    if(time_mul_ind == 0) return;
    time_mul_ind--;
    osi.set_time_mul(time_mul_des[time_mul_ind]/300);
    let text = time_mul_des[time_mul_ind] + "ms";
    $("#horizonal_time").text(text);
    // check();
    osi.draw();
}
function add_horizonal_time(){
    if(time_mul_ind == time_mul_des.length - 1) return;
    time_mul_ind++;
    osi.set_time_mul(time_mul_des[time_mul_ind]/300);
    let text = time_mul_des[time_mul_ind] + "ms";
    $("#horizonal_time").text(text);
    // check();
    osi.draw();
}

function minus_horizonal_position(){
    osi.set_time_offset(osi.time_offset - 20);
    // check();
    osi.draw();
}
function add_horizonal_position(){
    osi.set_time_offset(osi.time_offset + 20);
    // check();
    osi.draw();
}

function vertical_AC1(){
    osi.set_vertical_AC_GND_DC(0, "AC");
    // check();
    osi.draw();
    $("#vertical_AC1").css("backgroundColor", "green");
    $("#vertical_GND1").css("backgroundColor", "white");
    $("#vertical_DC1").css("backgroundColor", "white");
}
function vertical_GND1(){
    osi.set_vertical_AC_GND_DC(0, "GND");
    // check();
    osi.draw();
    $("#vertical_AC1").css("backgroundColor", "white");
    $("#vertical_GND1").css("backgroundColor", "green");
    $("#vertical_DC1").css("backgroundColor", "white");
}
function vertical_DC1(){
    osi.set_vertical_AC_GND_DC(0, "DC");
    // check();
    osi.draw();
    $("#vertical_AC1").css("backgroundColor", "white");
    $("#vertical_GND1").css("backgroundColor", "white");
    $("#vertical_DC1").css("backgroundColor", "green");
}

function vertical_AC2(){
    osi.set_vertical_AC_GND_DC(1, "AC");
    // check();
    osi.draw();
    $("#vertical_AC2").css("backgroundColor", "green");
    $("#vertical_GND2").css("backgroundColor", "white");
    $("#vertical_DC2").css("backgroundColor", "white");
}
function vertical_GND2(){
    osi.set_vertical_AC_GND_DC(1, "GND");
    // check();
    osi.draw();
    $("#vertical_AC2").css("backgroundColor", "white");
    $("#vertical_GND2").css("backgroundColor", "green");
    $("#vertical_DC2").css("backgroundColor", "white");
}
function vertical_DC2(){
    osi.set_vertical_AC_GND_DC(1, "DC");
    // check();
    osi.draw();
    $("#vertical_AC2").css("backgroundColor", "white");
    $("#vertical_GND2").css("backgroundColor", "white");
    $("#vertical_DC2").css("backgroundColor", "green");
}
function vertical_mode_ch1(){
    osi.set_show_mode("CH1");
    $("#vertical_mode_ch1").css("backgroundColor", "green");
    $("#vertical_mode_ch2").css("backgroundColor", "white");
    $("#vertical_mode_dual").css("backgroundColor", "white");
    $("#vertical_mode_add").css("backgroundColor", "white");
    osi.draw();
}
function vertical_mode_ch2(){
    osi.set_show_mode("CH2");
    $("#vertical_mode_ch1").css("backgroundColor", "white");
    $("#vertical_mode_ch2").css("backgroundColor", "green");
    $("#vertical_mode_dual").css("backgroundColor", "white");
    $("#vertical_mode_add").css("backgroundColor", "white");
    osi.draw();
}
function vertical_mode_dual(){
    osi.set_show_mode("DUAL");
    $("#vertical_mode_ch1").css("backgroundColor", "white");
    $("#vertical_mode_ch2").css("backgroundColor", "white");
    $("#vertical_mode_dual").css("backgroundColor", "green");
    $("#vertical_mode_add").css("backgroundColor", "white");
    osi.draw();
}
function vertical_mode_add(){
    $("#vertical_mode_ch1").css("backgroundColor", "white");
    $("#vertical_mode_ch2").css("backgroundColor", "white");
    $("#vertical_mode_dual").css("backgroundColor", "white");
    $("#vertical_mode_add").css("backgroundColor", "green");
}
var vertical_ch1_input_on = 0;
var vertical_ch2_input_on = 0;
function vertical_ch1_input(){
    if(vertical_ch1_input_on)return;
    if(vertical_ch2_input_on){
        $("#oscilloscope").removeClass('oscilloscope-bg01').addClass('oscilloscope-bg11');
    }
    else{
        $("#oscilloscope").removeClass('oscilloscope-bg00').addClass('oscilloscope-bg10');
    }
    vertical_ch1_input_on = 1;
}
function vertical_ch2_input(){
    if(vertical_ch2_input_on)return;
    if(vertical_ch1_input_on){
        $("#oscilloscope").removeClass('oscilloscope-bg10').addClass('oscilloscope-bg11');
    }
    else{
        $("#oscilloscope").removeClass('oscilloscope-bg00').addClass('oscilloscope-bg01');
    }
    vertical_ch2_input_on = 1;
}

function vertical_drawline1() {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 1020;
        AlligatorY1 = 530;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1020, 530];
    }
}
function vertical_drawline2() {
    colorNo = 6;
    if (drawAlligator) {
        AlligatorX1 = 1070;
        AlligatorY1 = 530;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1070, 530];
    }
}
function vertical_drawline3() {
    colorNo = 0;
    if (drawAlligator) {
        AlligatorX1 = 1350;
        AlligatorY1 = 530;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1350, 530];
    }
}
function vertical_drawline4() {
    colorNo = 6;
    if (drawAlligator) {
        AlligatorX1 = 1390;
        AlligatorY1 = 530;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [1390, 530];
    }
}


function trigger_slope() {
    osi.set_slope(osi.slope * -1)
    if(osi.slope == 1){
        $("#trigger_slope").text("SLOPE＋");
        $("#trigger_slope").css("backgroundColor", "white");
    }else{
        $("#trigger_slope").text("SLOPE－");
        $("#trigger_slope").css("backgroundColor", "green");
    }
    osi.draw();
}

function minus_trigger_level() {
    osi.set_level(osi.level - 0.5);
    let arrow_pos = osi.level * (-28) + 50;
    $("#level_show").css("top", arrow_pos.toString() + "px");
    osi.draw();
}

function add_trigger_level() {
    osi.set_level(osi.level + 0.5);
    osi.draw();
}

function trigger_ch1() {
    osi.set_refernece("CH1");
    $("#trigger_ch1").css("backgroundColor", "green");
    $("#trigger_ch2").css("backgroundColor", "white");
    osi.draw();
}

function trigger_ch2() {
    osi.set_refernece("CH2");
    $("#trigger_ch1").css("backgroundColor", "white");
    $("#trigger_ch2").css("backgroundColor", "green");
    osi.draw();
}

function trigger_line() {
    alert("LINE function is unimplement!");
}

function trigger_ext() {
    alert("EXT function is unimplement!");
}

function unimplemented() {
    alert("This function is unimplement!")
}

function oscillosocope_init() {
    osi.set_init();
    if(osi.init){
        $("#oscillosocope_init").css("backgroundColor", "green");
    }else{
        $("#oscillosocope_init").css("backgroundColor", "white");
    }
    osi.draw();
}

const mediaStreamConstraints = {
    video: true
};

function minus_horizonal_SWP(){
    if(osi._SWP < 0.8) return;
    if(osi._SWP < 1.04 && osi._SWP > 1){
        osi._SWP = 1;
    }else{
        osi._SWP -= 0.04;
    }
    osi.draw();
}

function add_horizonal_SWP(){
    if(osi._SWP > 1.2) return;
    if(osi._SWP > -0.96 && osi._SWP < 1){
        osi._SWP = 1;
    }else{
        osi._SWP += 0.04;
    }
    osi.draw();
}

function handleMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * max);
}