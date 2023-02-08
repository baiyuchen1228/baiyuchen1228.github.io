var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID

var startbool = false;

var meter1_mode = 0;
const meter_1_mode = [0, 1, 2, 3, 4];
const meter_1_Mode = ['關機', '600直流V', '200直流V', '20直流V', '2直流V']

const colorlist = ['Red', 'DarkRed', 'FireBrick', 'LightCoral', 'OrangeRed', 'Chocolate', 'Black', 'Indigo', 'Navy', 'Black', 'DeepSkyBlue', 'Brown', 'DarkRed', 'Blue', 'Magenta', 'Cyan', 'Lime', 'Orange', 'Purple', 'SkyBlue', 'Indigo', 'Fuchsia', 'DarkCyan', 'Olive', 'SeaGreen', 'Goldenrod']
var colorNo = 11;

var delALLalligator = null;

var pointarray = [];
const cur1 = document.querySelector("#powersupply1");
const vol1 = document.querySelector("#powersupply2");
const cur2 = document.querySelector("#powersupply3");
const vol2 = document.querySelector("#powersupply4");
const meter1_value = document.querySelector("#multimeter1_3");

const addcurrent1 = document.querySelector("#powersupply5");
const addvoltage1 = document.querySelector("#powersupply7");
const addcurrent2 = document.querySelector("#powersupply9");
const addvoltage2 = document.querySelector("#powersupply11");
const meter1_clockwise = document.querySelector("#multimeter1_1");

const deccurrent1 = document.querySelector("#powersupply6");
const decvoltage1 = document.querySelector("#powersupply8");
const deccurrent2 = document.querySelector("#powersupply10");
const decvoltage2 = document.querySelector("#powersupply12");
const meter1_counterclockwise = document.querySelector("#multimeter1_2");


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
    if (deletemode == 1) {
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
    if (power == 0) {
        cur1.innerHTML = current1.toFixed(2);
        cur2.innerHTML = current2.toFixed(2);
        vol1.innerHTML = voltage1.toFixed(2);
        vol2.innerHTML = voltage2.toFixed(2);
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
        $("#powersupply13").css("background-color", "White");
    }
}

function turnOffMode() {
    if (deletemode == 1) {
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
}

document.getElementById("powersupply13").onclick = function () {
    turnOffMode();
    if (power == 1 && powersupplyOutputStatus == 0) {
        powersupplyOutputStatus = 1;
        $("#powersupply13").css("background-color", "Lightgreen");
        console.log("output on!");
        check();
    } else {
        powersupplyOutputStatus = 0;
        $("#powersupply13").css("background-color", "White");
        cur1.innerHTML = current1.toFixed(2);
        cur2.innerHTML = current2.toFixed(2);
        vol1.innerHTML = voltage1.toFixed(2);
        vol2.innerHTML = voltage2.toFixed(2);
        console.log("power off!");
        check();
    }
}


var intervalID;
$(powersupply5).mousedown(function (){
    intervalID = setInterval(function (){
        turnOffMode();
        if (power == 1 && current1 <= 3) {
            current1 += 0.01;
            cur1.innerHTML = current1.toFixed(2);
        }
        check();
        }, 200
    );
}).mouseup(function () {
    clearInterval(intervalID);
});

$(powersupply6).mousedown(function (){
    intervalID = setInterval( function (){
    turnOffMode();
    if (power == 1) {
        current1 -= 0.01;
        if (current1 < 0) {
            current1 = 0;
        }
        cur1.innerHTML = current1.toFixed(2);
    }
    check();
}, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});

$(powersupply7).mousedown(function (){
    intervalID = setInterval( function (){
        turnOffMode();
        if (power == 1 && voltage1 <= 30) {
            voltage1 += 0.1;
            vol1.innerHTML = voltage1.toFixed(2);
        }
        check();
    }, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});

$(powersupply8).mousedown(function (){
    intervalID = setInterval( function (){
    turnOffMode();
    if (power == 1) {
        voltage1 -= 0.1;
        if (voltage1 < 0) {
            voltage1 = 0;
        }
        vol1.innerHTML = voltage1.toFixed(2);
    }
    check();
}, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});

$(powersupply9).mousedown(function (){
    intervalID = setInterval( function (){
    turnOffMode();
    if (power == 1 && current2 <= 3) {
        current2 += 0.01;
        cur2.innerHTML = current2.toFixed(2);
    }
    check();
}, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});
$(powersupply10).mousedown(function (){
    intervalID = setInterval( function (){
    turnOffMode();
    if (power == 1) {
        current2 -= 0.01;
        if (current2 < 0) {
            current2 = 0;
        }
        cur2.innerHTML = current2.toFixed(2);
    }
    check();
}, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});
$(powersupply11).mousedown(function (){
    intervalID = setInterval( function (){
    turnOffMode();
    if (power == 1 && voltage2 <= 30) {
        voltage2 += 0.1;
        vol2.innerHTML = voltage2.toFixed(2);
    }
    check();
}, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});
$(powersupply12).mousedown(function (){
    intervalID = setInterval( function (){
    turnOffMode();
    if (power == 1) {
        voltage2 -= 0.1;
        if (voltage2 < 0) {
            voltage2 = 0;
        }
        vol2.innerHTML = voltage2.toFixed(2);
    }
    check();
}, 200 );
}).mouseup(function () {
    clearInterval(intervalID);
});

addcurrent1.onclick = function () {
    turnOffMode();
    if (power == 1 && current1 <= 3) {
        current1 += 0.01;
        cur1.innerHTML = current1.toFixed(2);
    }
    check();
}

addvoltage1.onclick = function () {
    turnOffMode();
    if (power == 1 && voltage1 <= 30) {
        voltage1 += 0.1;
        vol1.innerHTML = voltage1.toFixed(2);
    }
    check();
}

addcurrent2.onclick = function () {
    turnOffMode();
    if (power == 1 && current2 <= 3) {
        current2 += 0.01;
        cur2.innerHTML = current2.toFixed(2);
    }
    check();
}

addvoltage2.onclick = function () {
    turnOffMode();
    if (power == 1 && current2 <= 30) {
        voltage2 += 0.1;
        vol2.innerHTML = voltage2.toFixed(2);
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
        vol1.innerHTML = voltage1.toFixed(2);
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
        vol2.innerHTML = voltage2.toFixed(2);
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

const meter1_drowline1 = document.querySelector("#multimeter1_4");
const meter1_drowline2 = document.querySelector("#multimeter1_5");
const meter1_drowline3 = document.querySelector("#multimeter1_6");
const power_drowline1 = document.querySelector("#powersupply15");
const power_drowline2 = document.querySelector("#powersupply16");
const power_drowline3 = document.querySelector("#powersupply17");
const power_drowline4 = document.querySelector("#powersupply18");

var x1, x2, y1, y2, drawline = true;
var AlligatorX1 = 0, AlligatorY1 = 0;
var finalOutput;
var drawAlligator = 0;
var AlligatorInitial;

var chipNo = 1;
var alligatorNo = 1;
var deletemode = 0;
var delIni;


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
    colorNo = 6;
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
    alert("本實驗不開放使用這一組電功，請用左邊的電功");
    return;
    colorNo = 1;
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
    alert("本實驗不開放使用這一組電功，請用左邊的電功");
    return;
    colorNo = 7;
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
    colorNo = 2;
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
    colorNo = 8;
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
    colorNo = 3;
    if (drawAlligator) {
        AlligatorX1 = 205;
        AlligatorY1 = 565;
        document.onmousemove = drawDashedLine2();
    }
    if (deletemode) {
        delALLalligator = [205, 565];
    }
}


function approx_x(x) {
    return (Math.floor(x / 20) * 20 + 5);
}

$("#container").mousedown(function (e) {
    if (deletemode == 1) {
        delIni = e;
    }
    if (!document.onmousemove)
        document.onmousemove = drawDashedLine();
});

function drawDashedLine2() {
    function draw(e) {
        let mode = false;
        if (drawAlligator == 1) {
            x2 = approx_x(e.pageX);
            y2 = approx_x(e.pageY);
            x2 += 10;
            x2 += 2;
            y2 += 2;
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
    if (drawAlligator == 1) {
        var AlligatorFinal = e;

        x1 = AlligatorX1;
        y1 = AlligatorY1;
        x2 = approx_x(AlligatorFinal.pageX);
        y2 = approx_x(AlligatorFinal.pageY);
        x2 += 10;
        x2 += 2;
        y2 += 2;
        if (x1 == 0 || y1 == 0) {
            alert('(請先點按鈕)please click button first');
            return;
        }
        console.log(x2,y2);
        if (x2 < 617 || x2 > 837 || y2 < 327 || y2 > 547) {
            if(((x2 == 577 && y2 == 427) || (x2 == 877 && y2 == 427)));
            else{
                alert('(請畫在麵包版上)please draw on breadboard');
                return;
            }
        }
        console.log(x2);
        if (findNodeNum(x1, y1) == 1 || findNodeNum(x1, y1) == 0) {
            if(x2 == 877 || x2 == 577) {}else {
                alert('正負極只能接在左右兩個點');
                return;
            }
        }
        // if (x1 == x2 && y1 == y2) {
        //     alert("(不能在同一點畫線)It is meaningless to insert both the ends of wire to the same point.");
        //     return;
        // }
        if (alligatorNo < 10) {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_0' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_0' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator0' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px;"/>'));
            linestack.push("alligator0"+alligatorNo);
        }
        else {
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle1_' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<circle id=alligatorCircle2_' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2"><title></title></line>'));
            document.getElementById('svgline2').appendChild(parseSVG('<line id=alligator' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px;"/>'));
            linestack.push("alligator"+alligatorNo);
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
        // console.log(delIni);

        var delFin = e;
        // console.log(delFin);
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
                check();
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
                check();
                return;
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
                    // console.log(Things[i].id[0]);
                    pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
                    pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
                    if (Things[i].id[0] == "a") {
                        $("#alligatorCircle1_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#alligatorCircle2_" + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
                        $("#" + Things[i].id).remove();
                        delALLalligator = null;
                    }
                    check();
                    return;
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
    current_x = 0;
    // context.lineWidth = 3;
    // context.strokeStyle = "red";
    // context.beginPath(); // Start the path
    // context.moveTo(15, 0); // Set the path origin
    // context.lineTo(15, 270); // Set the path destination
    // context.closePath(); // Close the path
    // context.stroke(); // Outline the path

    // context.strokeStyle = "black";
    // context.beginPath(); // Start the path
    // context.moveTo(75, 0); // Set the path origin
    // context.lineTo(75, 50 * 11 - 5); // Set the path destination
    // context.closePath(); // Close the path
    // context.stroke(); // Outline the path


    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 12; i++) {
            current_x = current_x + 20;
            context.fillRect(60 + 20 * j, current_x, 10, 10);
        };
        current_x = 0;

    };
    context.fillStyle = "rgb(88,88,88)";
    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 12; i++) {
            current_x = current_x + 20;
            context.fillRect(160 + 20 * j, current_x, 10, 10);
        };
        current_x = 0;

    };
    current_x = 0;
    for (var j = 0; j < 12; j++) {
        current_x = current_x + 20;
        context.fillRect(260, current_x, 10, 10);
    };
    current_x = 0;
    for (var j = 0; j < 12; j++) {
        current_x = current_x + 20;
        context.fillRect(280, current_x, 10, 10);
    };

    context.fillRect(20, 120, 10, 10);
    context.fillRect(320, 120, 10, 10);
    // context.lineWidth = 3;
    // context.strokeStyle = "red";
    // context.beginPath(); // Start the path
    // context.moveTo(325, 0); // Set the path origin
    // context.lineTo(325, 270); // Set the path destination
    // context.closePath(); // Close the path
    // context.stroke(); // Outline the path

});
function toggleDelButton() {
    if (drawAlligator == 1) {
        $this = $("#addAlligator");
        $this.css('background-color', 'white');
        drawAlligator = 0;
    }
    $this = $("#del");
    if (deletemode == 1) {
        $this.css('background-color', 'white');
        delALLalligator = null;
        deletemode = 0;
    }
    else {
        $this.css('background-color', 'red');
        deletemode = 1;
    }
}

function toggleAlligatorButton() {
    if (deletemode == 1) {
        $("#del").css('background-color', 'white');
        delALLalligator = null;
        deletemode = 0;
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



function abs(x) {
    if (x < 0) { return -x; }
    return x;
}


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

function distance(point1, point2){
    let delta_x = point1.x - point2.x;
    let delta_y = point1.y - point2.y;
    return  Math.sqrt(delta_x * delta_x + delta_y * delta_y)
}


function checkCircuit() {
    alli = getAlligator();
    console.log(alli);
    let power_pos = {x : -1, y : -1}, power_neg = {x : -1, y : -1};
    let multer_pos = {x : -1, y : -1}, multer_neg = {x : -1, y : -1};
    let power1 = {voltage:"ERR", current:"ERR"};
    let power2 = {voltage:0, current:0};
    let meter = {voltage:"ERR"};
    for(let i=0;i<alli.length;i++){
        tmp = alli[i];
        console.log(tmp)
        if(tmp.node1 == 4){
            multer_pos.x = tmp.x2;
            multer_pos.y = tmp.y2;
        }else if(tmp.node1 == 5){
            multer_neg.x = tmp.x2;
            multer_neg.y = tmp.y2;
        }else if(tmp.node1 == 1){
            power_neg.x = tmp.x2;
            power_neg.y = tmp.y2;
        }else if(tmp.node1 == 0){
            power_pos.x = tmp.x2;
            power_pos.y = tmp.y2;
        }else{
            show_error("電壓計的正極放錯了。");
            return {meter:meter, power1:power1, power2:power2};
        }
    }
    console.log(power_pos.x, power_pos.y);
    console.log(power_neg.x, power_neg.y);
    console.log(multer_pos.x, multer_pos.y);
    console.log(multer_neg.x, multer_neg.y);
    if(power_pos.x == -1 || power_neg.x == -1 || multer_neg.x == -1 || multer_pos.x == -1){
        show_error("電功或電壓計沒有夾到鱷魚夾");
        return {meter:meter, power1:power1, power2:power2};
    }
    if(power_neg.x != multer_neg.x || power_neg.y != multer_neg.y){
        show_error("電功與電錶的負極要接再一起");
        return {meter:meter, power1:power1, power2:power2};
    }
    power1.voltage = voltage1;
    power1.current = current1;
    let dis_multer = distance(multer_pos, multer_neg);
    let dis_power = distance(power_pos, power_neg);
    meter.voltage = power1.voltage * dis_multer / dis_power;
    if(distance(power_pos, multer_pos) > distance(power_pos, multer_neg)){
        meter.voltage *= -1;
    }
    return {meter:meter, power1:power1, power2:power2};
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
    return;
}

linestack = [];
function undo(){
    if(linestack.length == 0){
        return;
    }
    let target = linestack.length - 1;
    pointarray = deleteRow(pointarray, pointarray.length-1);
    pointarray = deleteRow(pointarray, pointarray.length-1);
    if (linestack[target][0] == "a") {
        $("#alligatorCircle1_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#alligatorCircle2_" + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
        $("#" + linestack[target]).remove();
        delALLalligator = null;
    }
    linestack.pop();
    check();
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
function show_error(s){
    document.querySelector("#error_message_content").innerHTML = s;
}

const panel_mode = ["zeroRed", "oneRed", "twoRed"];
var panel = panel_mode[0];

function zeroRed(){
    panel = panel_mode[0];
    $("#zeroRed").css('background-color', 'rosybrown');
    $("#oneRed").css('background-color', 'white');
    $("#twoRed").css('background-color', 'white');
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var current_x = 0;
    context.lineWidth = 4;
    context.fillStyle = "#FFF5EB";
    context.strokeStyle = "#FFF5EB";
    context.beginPath(); // Start the path
    context.moveTo(25, 0); // Set the path origin
    context.lineTo(25, 270); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path
    
    context.beginPath(); // Start the path
    context.moveTo(325, 0); // Set the path origin
    context.lineTo(325, 270); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path
    context.fillStyle = "rgb(88, 88, 88)";
    context.fillRect(20, 120, 10, 10);
    context.fillRect(320, 120, 10, 10);
}

function oneRed(){
    panel = panel_mode[1];
    $("#zeroRed").css('background-color', 'white');
    $("#oneRed").css('background-color', 'rosybrown');
    $("#twoRed").css('background-color', 'white');
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var current_x = 0;
    context.lineWidth = 4;
    context.fillStyle = "#FFF5EB";
    context.strokeStyle = "#FFF5EB";
    context.beginPath(); // Start the path
    context.moveTo(25, 0); // Set the path origin
    context.lineTo(25, 270); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path
    
    context.fillStyle = "red";
    context.strokeStyle = "red";
    context.beginPath(); // Start the path
    context.moveTo(325, 0); // Set the path origin
    context.lineTo(325, 270); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path
    context.fillStyle = "rgb(88, 88, 88)";
    context.fillRect(20, 120, 10, 10);
    context.fillRect(320, 120, 10, 10);
}

function twoRed(){
    panel = panel_mode[2];
    $("#zeroRed").css('background-color', 'white');
    $("#oneRed").css('background-color', 'white');
    $("#twoRed").css('background-color', 'rosybrown');
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var current_x = 0;
    context.strokeStyle = "rgb(208, 208, 208)";
    context.fillStyle = "rgb(88, 88, 88)";
    current_x = 0;
    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.beginPath(); // Start the path
    context.moveTo(25, 0); // Set the path origin
    context.lineTo(25, 270); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path
    
    context.beginPath(); // Start the path
    context.moveTo(325, 0); // Set the path origin
    context.lineTo(325, 270); // Set the path destination
    context.closePath(); // Close the path
    context.stroke(); // Outline the path
    context.fillStyle = "rgb(88, 88, 88)";
    context.fillRect(20, 120, 10, 10);
    context.fillRect(320, 120, 10, 10);
}