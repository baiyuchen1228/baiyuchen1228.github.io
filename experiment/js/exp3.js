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
        x2 = approx_x(delFin.pageX);
        y2 = approx_x(delFin.pageY);
        x1 -= 540;
        x2 -= 540;
        y1 -= 300;
        y2 -= 300;
        var id;
        Things = $("line");
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
    if(multer_neg.x != 27 || multer_neg.y != 127){
        show_error("負極要放左邊");
        return {meter:meter, power1:power1, power2:power2};
    }
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
    if(panel == 'zeroRed'){
        meter.voltage = power1.voltage * p2p[(multer_pos.x - 67) / 20 + 1][(multer_pos.y - 27) / 20 + 1];
    }
    else if(panel == 'oneRed'){
        meter.voltage = power1.voltage * p2l[(multer_pos.x - 67) / 20 + 1][(multer_pos.y - 27) / 20 + 1];
    }
    else if(panel == 'twoRed'){
        meter.voltage = power1.voltage * l2l[(multer_pos.x - 67) / 20 + 1][(multer_pos.y - 27) / 20 + 1];
    }
    console.log(meter.voltage);
    if(power1.voltage == 0){
        power1 = {voltage:0, current:0};
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

var p2p = [[0.38416284902715214,0.3796424228785279,0.3653297879117622,0.3384283153061305,0.2915658316829748,0.20336068191660855,0.0,0.20336068191660867,0.291565831682975,0.33842831530613077,0.3653297879117625,0.37964242287852823,0.3841628490271524],
[0.3886832751757764,0.38453852728759874,0.3716242067311953,0.34840882081489255,0.3122371647545801,0.2609384479917297,0.2065031633468516,0.2609384479917298,0.3122371647545803,0.34840882081489283,0.37162420673119556,0.38453852728759896,0.3886832751757766],
[0.401493197100756,0.39820420436489534,0.38821969091052777,0.37134559646766446,0.3480355585287234,0.3216527819488787,0.3041357574039468,0.3216527819488788,0.3480355585287236,0.3713455964676647,0.388219690910528,0.3982042043648955,0.40149319710075615],
[0.42088110449745686,0.41856540216069893,0.4117047560783562,0.40071831561651416,0.3869066909437705,0.37350136387111477,0.3667343023711783,0.3735013638711149,0.38690669094377067,0.40071831561651433,0.4117047560783564,0.4185654021606991,0.4208811044974571],
[0.4449004165676737,0.4434715437020873,0.4393156156256838,0.4329162189762654,0.42537152575872966,0.41871168022063177,0.41579872433853693,0.4187116802206319,0.42537152575872983,0.4329162189762657,0.439315615625684,0.4434715437020875,0.44490041656767393],
[0.47177747436906337,0.47110474045429274,0.4691699437460262,0.46625941890413425,0.462951512894251,0.46017510691414576,0.4590372345417058,0.46017510691414587,0.4629515128942512,0.4662594189041345,0.4691699437460265,0.47110474045429307,0.47177747436906364],
[0.4999999999999942,0.4999999999999942,0.4999999999999942,0.49999999999999434,0.49999999999999445,0.49999999999999456,0.49999999999999467,0.49999999999999467,0.49999999999999467,0.49999999999999467,0.4999999999999946,0.4999999999999946,0.49999999999999456],
[0.5282225256309252,0.5288952595456957,0.5308300562539623,0.5337405810958545,0.5370484871057379,0.5398248930858434,0.5409627654582836,0.5398248930858436,0.5370484871057382,0.5337405810958549,0.5308300562539627,0.5288952595456962,0.5282225256309255],
[0.5550995834323149,0.5565284562979014,0.560684384374305,0.5670837810237235,0.5746284742412595,0.5812883197793577,0.5842012756614527,0.5812883197793579,0.5746284742412598,0.5670837810237238,0.5606843843743053,0.5565284562979018,0.5550995834323154],
[0.5791188955025319,0.5814345978392899,0.5882952439216329,0.5992816843834752,0.6130933090562192,0.6264986361288754,0.633265697628812,0.6264986361288755,0.6130933090562194,0.5992816843834754,0.5882952439216331,0.5814345978392903,0.5791188955025323],
[0.5985068028992329,0.6017957956350936,0.6117803090894613,0.6286544035323252,0.651964441471267,0.6783472180511125,0.6958642425960448,0.6783472180511125,0.6519644414712671,0.6286544035323255,0.6117803090894617,0.6017957956350939,0.5985068028992332],
[0.6113167248242124,0.6154614727123902,0.6283757932687939,0.6515911791850973,0.6877628352454109,0.7390615520082628,0.7934968366531425,0.7390615520082628,0.687762835245411,0.6515911791850977,0.6283757932687943,0.6154614727123906,0.6113167248242128],
[0.6158371509728366,0.620357577121461,0.634670212088227,0.6615716846938595,0.7084341683170168,0.7966393180833856,1.0,0.7966393180833856,0.7084341683170169,0.66157168469386,0.6346702120882275,0.6203575771214614,0.6158371509728371]]
var p2l = [[0.5460894607060309,0.5395790156382825,0.5190096208519314,0.4804913699014661,0.4136771832797862,0.288363534171336,0.0,0.2883635341713361,0.4136771832797864,0.48049136990146646,0.5190096208519317,0.5395790156382828,0.5460894607060311],
[0.5525999057737793,0.5466084904975839,0.5279840489339884,0.4946393377370735,0.4429269145231714,0.3698884767027789,0.2926088901293546,0.369888476702779,0.4429269145231716,0.49463933773707386,0.5279840489339888,0.5466084904975842,0.5525999057737796],
[0.5710931813939184,0.5662709916442854,0.5516787466493651,0.5271550175896682,0.49350266037304713,0.4556545679872537,0.43065860711186044,0.4556545679872538,0.49350266037304724,0.5271550175896685,0.5516787466493654,0.5662709916442857,0.5710931813939186],
[0.5992308365133234,0.5957035480362745,0.5853049284295186,0.5687993255991874,0.5482741413920952,0.5285685277613282,0.5187164023435797,0.5285685277613283,0.5482741413920953,0.5687993255991877,0.5853049284295189,0.5957035480362747,0.5992308365133237],
[0.6344230685868266,0.6320074355579706,0.6250380934332476,0.6144632149854674,0.602226051834818,0.5916289993223846,0.5870699467398021,0.5916289993223846,0.6022260518348181,0.6144632149854676,0.6250380934332478,0.6320074355579708,0.6344230685868268],
[0.674446566718042,0.6728650321755337,0.6683767947600338,0.6617893890746168,0.6545378516393251,0.6486514709535898,0.6463053859708594,0.6486514709535898,0.6545378516393252,0.6617893890746172,0.6683767947600341,0.6728650321755341,0.6744465667180424],
[0.7176331339342741,0.7166293316660887,0.7138146643567371,0.7097796949136412,0.7054844946942755,0.7021336468817903,0.7008486552364561,0.7021336468817903,0.7054844946942758,0.7097796949136415,0.7138146643567375,0.7166293316660889,0.7176331339342743],
[0.7628273056868773,0.7622044961978096,0.7604728360871851,0.7580302315289356,0.7554867853423459,0.7535499666428396,0.7528219412113847,0.7535499666428396,0.755486785342346,0.7580302315289358,0.7604728360871853,0.7622044961978097,0.7628273056868773],
[0.8092670964176158,0.8088885113510876,0.8078419522652583,0.8063816097725702,0.8048824485033332,0.8037574931358373,0.8033391763234037,0.8037574931358373,0.8048824485033332,0.8063816097725703,0.8078419522652583,0.8088885113510875,0.8092670964176156],
[0.8564640572814107,0.8562405005236667,0.8556248518501905,0.8547718067927539,0.8539039057625795,0.8532583810737728,0.8530197778105559,0.8532583810737728,0.8539039057625795,0.8547718067927539,0.8556248518501903,0.8562405005236664,0.8564640572814104],
[0.9041081316606936,0.903984581611978,0.9036451478190833,0.9031768597856752,0.902702986680458,0.9023523475861188,0.9022231727712742,0.9023523475861188,0.9027029866804579,0.9031768597856751,0.903645147819083,0.9039845816119778,0.9041081316606934],
[0.9519993061374078,0.9519445464444688,0.9517942980284895,0.9515874978504058,0.9513788335874585,0.9512248498189702,0.9511682181023037,0.9512248498189703,0.9513788335874585,0.9515874978504058,0.9517942980284894,0.9519445464444687,0.9519993061374077],
[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0]]
var l2l = [[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],
[0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287,0.08333333333333287],
[0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574,0.16666666666666574],
[0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867,0.24999999999999867],
[0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316,0.3333333333333316],
[0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463,0.41666666666666463],
[0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978,0.4999999999999978],
[0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331,0.583333333333331],
[0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645,0.6666666666666645],
[0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982,0.7499999999999982],
[0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319,0.8333333333333319],
[0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659,0.9166666666666659],
[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0]]