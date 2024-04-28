var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID

var startbool = false;

var meter1_mode = 0;
const meter_1_mode = [0, 1, 2, 3, 4];
const meter_1_Mode = ['關機', '600直流V', '200直流V', '20直流V', '2直流V'];

const colorlist = ['Red', 'DarkRed', 'FireBrick', 'LightCoral', 'OrangeRed', 'Chocolate', 'Black', 'Indigo', 'Navy', 'Black', 'DeepSkyBlue', 'Brown', 'DarkRed', 'Blue', 'Magenta', 'Cyan', 'Lime', 'Orange', 'Purple', 'SkyBlue', 'Indigo', 'Fuchsia', 'DarkCyan', 'Olive', 'SeaGreen', 'Goldenrod'];
var colorNo = 11;

var delALLalligator = null;

var pointarray = [];
const cur1 = document.querySelector('#powersupply1');
const vol1 = document.querySelector('#powersupply2');
const cur2 = document.querySelector('#powersupply3');
const vol2 = document.querySelector('#powersupply4');
const meter1_value = document.querySelector('#multimeter1_3');

const meter1_clockwise = document.querySelector('#multimeter1_1');

const meter1_counterclockwise = document.querySelector('#multimeter1_2');

var current1 = 0,
	voltage1 = 0,
	current2 = 0,
	voltage2 = 0,
	power = 0,
	powersupplyOutputStatus = 0;

function turnOffMode() {
	if (deletemode == 1) {
		$this = $('#del');
		$this.css('background-color', 'white');
		deletemode = 0;
		delALLalligator = null;
	} else if (drawAlligator == 1) {
		$this = $('#addAlligator');
		$this.css('background-color', 'white');
		drawAlligator = 0;
	}
}

meter1_clockwise.onclick = function () {
	turnOffMode();
	let last_mode = meter1_mode;
	meter1_mode = (meter1_mode + 1) % 5;
	$('#multimeter1')
		.removeClass('multimeter-1-bg' + last_mode)
		.addClass('multimeter-1-bg' + meter1_mode);
	$('#multimeter1_7').text('狀態:' + meter_1_Mode[meter1_mode]);
	check();
};

meter1_counterclockwise.onclick = function () {
	turnOffMode();
	let last_mode = meter1_mode;
	meter1_mode = (meter1_mode - 1 + 5) % 5;
	$('#multimeter1')
		.removeClass('multimeter-1-bg' + last_mode)
		.addClass('multimeter-1-bg' + meter1_mode);
	$('#multimeter1_7').text('狀態:' + meter_1_Mode[meter1_mode]);
	check();
};

const meter1_drowline1 = document.querySelector('#multimeter1_4');
const meter1_drowline2 = document.querySelector('#multimeter1_5');
const meter1_drowline3 = document.querySelector('#multimeter1_6');
const power_drowline1 = document.querySelector('#powersupply15');
const power_drowline2 = document.querySelector('#powersupply16');
const power_drowline3 = document.querySelector('#powersupply17');
const power_drowline4 = document.querySelector('#powersupply18');

var x1,
	x2,
	y1,
	y2,
	drawline = true;
var AlligatorX1 = 0,
	AlligatorY1 = 0;
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
};
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
};
power_drowline3.onmousedown = function (e) {
	alert('本實驗不開放使用這一組電功，請用左邊的電功');
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
};
power_drowline4.onmousedown = function (e) {
	alert('本實驗不開放使用這一組電功，請用左邊的電功');
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
};
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
};
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
};
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
};

function approx_x(x) {
	return Math.floor(x / 20) * 20 + 5;
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
			if ($('#dashline').length > 0) {
				$('#dashline').remove();
			}
			if ($('#vertical_dashline').length > 0) {
				$('#vertical_dashline').remove();
			}
			if ($('#horizental_dashline').length > 0) {
				$('#horizental_dashline').remove();
			}
			document.getElementById('svgline2').appendChild(parseSVG('<line id=dashline x1=' + AlligatorX1 + ' y1=' + AlligatorY1 + ' x2=' + x2 + ' y2=' + y2 + ' " style="stroke:' + colorlist[colorNo] + ' ;stroke-width:5px;" stroke-dasharray="5"></line>'));
			let offsetX = 550;
			let offsetY = 300;
			tmpx = x2 - offsetX;
			tmpy = y2 - offsetY;
			document.getElementById('svgline').appendChild(parseSVG('<line id=vertical_dashline x1=' + tmpx + ' y1=' + 0 + ' x2=' + tmpx + ' y2=' + 280 + ' " style="stroke:' + colorlist[colorNo] + ' ;stroke-width:10px;" stroke-opacity="0.3"></line>'));
			document.getElementById('svgline').appendChild(parseSVG('<line id=horizental_dashline x1=' + 0 + ' y1=' + tmpy + ' x2=' + 400 + ' y2=' + tmpy + ' " style="stroke:' + colorlist[colorNo] + ' ;stroke-width:10px;" stroke-opacity="0.3"></line>'));
		}
	}
	return draw;
}

function parseSVG(s, onclickFunc = null) {
	var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
	var frag = document.createDocumentFragment();
	while (div.firstChild.firstChild) {
		if (onclickFunc) {
			div.firstChild.firstChild.onclick = onclickFunc;
		}
		frag.appendChild(div.firstChild.firstChild);
	}
	return frag;
}

function deleteRow(arr, row) {
	arr = arr.slice(0); // make copy
	arr.splice(row, 1);
	return arr;
}

function directDelete(element) {
	if (deletemode == 1) {
		var toDelete = element.target;
		if (toDelete.id[0] == 'w') {
			toDelete = document.getElementById('wire' + toDelete.id[toDelete.id.length - 2] + toDelete.id[toDelete.id.length - 1]);
		} else if (toDelete.id[0] == 'r') {
			toDelete = document.getElementById('resistance' + toDelete.id[toDelete.id.length - 2] + toDelete.id[toDelete.id.length - 1]);
		} else if (toDelete.id[0] == 'i') {
			toDelete = document.getElementById('inductance' + toDelete.id[toDelete.id.length - 2] + toDelete.id[toDelete.id.length - 1]);
		} else if (toDelete.id[0] == 'c') {
			toDelete = document.getElementById('capacitance' + toDelete.id[toDelete.id.length - 2] + toDelete.id[toDelete.id.length - 1]);
		} else if (toDelete.id[0] == 'a') {
			toDelete = document.getElementById('alligator' + toDelete.id[toDelete.id.length - 2] + toDelete.id[toDelete.id.length - 1]);
		} else if (toDelete.id[0] == 'L') {
			toDelete = document.getElementById('LEd' + toDelete.id[toDelete.id.length - 2] + toDelete.id[toDelete.id.length - 1]);
		}

		x1 = approx_x(parseInt(toDelete.x1.animVal.value));
		y1 = approx_x(parseInt(toDelete.y1.animVal.value));
		x2 = approx_x(parseInt(toDelete.x2.animVal.value));
		y2 = approx_x(parseInt(toDelete.y2.animVal.value));

		Things = $('line');
		for (var i = Things.length - 1; i >= 0; i--) {
			if (Things[i].x1.baseVal.value == x1 && Things[i].y1.baseVal.value == y1) {
				for (let j = 0; j < pointarray.length; j++) {
					if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
						pointarray[j] = [0, 0];
					}
				}
				for (let j = 0; j < pointarray.length; j++) {
					if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
						pointarray[j] = [0, 0];
					}
				}
				pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
				pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
				if (Things[i].id[0] == 'w') {
					$('#wireCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#wireCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
				}

				if (Things[i].id[0] == 'r') {
					$('#resistanceCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#resistanceCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#resistanceBox' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					resistanceOn = 1;
					$this = $('#addResistance');
					$this.css('background-color', 'white');
				}
				if (Things[i].id[0] == 'i') {
					$('#inductanceCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#inductanceCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#inductanceBox' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					inductanceOn = 1;
					$this = $('#addInductance');
					$this.css('background-color', 'white');
				}
				if (Things[i].id[0] == 'c') {
					$('#capacitanceCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#capacitanceCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#capacitanceBox' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					capacitanceOn = 1;
					$this = $('#addCapacitance');
					$this.css('background-color', 'white');
				}
				if (Things[i].id[0] == 'L') {
					$('#LEdcircle' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
				}
				check();
				return;
			}
			if (Things[i].x2.baseVal.value == x1 && Things[i].y2.baseVal.value == y1) {
				for (let j = 0; j < pointarray.length; j++) {
					if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
						pointarray[j] = [0, 0];
					}
				}
				for (let j = 0; j < pointarray.length; j++) {
					if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
						pointarray[j] = [0, 0];
					}
				}

				pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
				pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
				if (Things[i].id[0] == 'w') {
					$('#wireCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#wireCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
				}

				if (Things[i].id[0] == 'r') {
					resistanceOn = 1;
					$('#resistanceCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#resistanceCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#resistanceBox' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					resistanceOn = 1;
					$this = $('#addResistance');
					$this.css('background-color', 'white');
				}
				if (Things[i].id[0] == 'i') {
					inductanceOn = 1;
					$('#inductanceCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#inductanceCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#inductanceBox' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					inductanceOn = 1;
					$this = $('#addInductance');
					$this.css('background-color', 'white');
				}
				if (Things[i].id[0] == 'c') {
					capacitanceOn = 1;
					$('#capacitanceCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#capacitanceCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#capacitanceBox' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
				}
				if (Things[i].id[0] == 'L') {
					$('#LEdcircle' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					capacitanceOn = 1;
					$this = $('#addCapacitance');
					$this.css('background-color', 'white');
				}
				check();
				return;
			}
		}

		// delete alligator
		x1 = parseInt(toDelete.x1.animVal.value);
		y1 = parseInt(toDelete.y1.animVal.value);
		x2 = parseInt(toDelete.x2.animVal.value);
		y2 = parseInt(toDelete.y2.animVal.value);
		if (osi._init == 1 && x1 == 1020 && y1 == 530) {
			osi.set_init(0);
		}
		if (osi._init == 2 && x1 == 1350 && y1 == 530) {
			osi.set_init(0);
		}
		for (var i = Things.length - 1; i >= 0; i--) {
			if (Things[i].x1.baseVal.value == x1 && Things[i].y1.baseVal.value == y1) {
				for (let j = 0; j < pointarray.length; j++) {
					if (Things[i].x1.baseVal.value == pointarray[j][0] && Things[i].y1.baseVal.value == pointarray[j][1]) {
						pointarray[j] = [0, 0];
					}
				}
				for (let j = 0; j < pointarray.length; j++) {
					if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
						pointarray[j] = [0, 0];
					}
				}
				pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
				pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
				if (Things[i].id[0] == 'a') {
					$('#alligatorCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#alligatorCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
					$('#' + Things[i].id).remove();
					delALLalligator = null;
				}
				check();
				return;
			}
		}
	}
}

$('#container').mouseup(function (e) {
	$('#dashline').remove();
	$('#vertical_dashline').remove();
	$('#horizental_dashline').remove();
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

		if (x2 < 617 || x2 > 837 || y2 < 327 || y2 > 547) {
			if ((x2 == 577 && y2 == 427) || (x2 == 877 && y2 == 427));
			else {
				alert('(請畫在麵包版上)please draw on breadboard');
				return;
			}
		}

		if (findNodeNum(x1, y1) == 1 || findNodeNum(x1, y1) == 0) {
			if (x2 == 877 || x2 == 577) {
			} else {
				alert('正負極只能接在左右兩個點');
				return;
			}
		}
		for (let i = 0; i < pointarray.length; i++) {
			if (pointarray[i][0] == 577 && pointarray[i][1] == 427) {
				// 負極可以接多個
				continue;
			}
			if ((x1 == pointarray[i][0] && y1 == pointarray[i][1]) || (x2 == pointarray[i][0] && y2 == pointarray[i][1])) {
				alert('(不能在同一點畫線)It is meaningless to insert two wire to the same point.');
				return;
			}
		}
		if (x1 == x2 && y1 == y2) {
			alert('(不能在同一點畫線)It is meaningless to insert both the ends of wire to the same point.');
			return;
		}
		if (alligatorNo < 10) {
			let circle1 = parseSVG('<circle id=alligatorCircle1_0' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2 pointer-events: all;"><title></title></line>', directDelete);
			let circle2 = parseSVG('<circle id=alligatorCircle2_0' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2 pointer-events: all;"><title></title></line>', directDelete);
			let line = parseSVG('<line id=alligator0' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px; pointer-events: all;"/>', directDelete);
			document.getElementById('svgline2').appendChild(circle1);
			document.getElementById('svgline2').appendChild(circle2);
			document.getElementById('svgline2').appendChild(line);
			linestack.push('alligator0' + alligatorNo);
		} else {
			let circle1 = parseSVG('<circle id=alligatorCircle1_' + alligatorNo + ' cx=' + x1 + ' cy=' + y1 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2 pointer-events: all;"><title></title></line>', directDelete);
			let circle2 = parseSVG('<circle id=alligatorCircle2_' + alligatorNo + ' cx=' + x2 + ' cy=' + y2 + ' r=' + 5 + ' style="fill:' + colorlist[colorNo] + ';stroke-width:2 pointer-events: all;"><title></title></line>', directDelete);
			let line = parseSVG('<line id=alligator' + alligatorNo + ' x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + ' style="stroke:' + colorlist[colorNo] + ';stroke-width:5px; pointer-events: all;"/>', directDelete);
			document.getElementById('svgline2').appendChild(circle1);
			document.getElementById('svgline2').appendChild(circle2);
			document.getElementById('svgline2').appendChild(line);
			linestack.push('alligator' + alligatorNo);
		}
		pointarray.push([x1, y1]);
		pointarray.push([x2, y2]);
		alligatorNo++;
		AlligatorInitial = null;
		colorNo = (colorNo + 1) % colorlist.length;
		AlligatorX1 = 0;
		AlligatorY1 = 0;
		// toggleAlligatorButton();
		// turnOffMode();
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

		Things = $('line');
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
							pointarray[j] = [0, 0];
						}
					}
					for (let j = 0; j < pointarray.length; j++) {
						if (Things[i].x2.baseVal.value == pointarray[j][0] && Things[i].y2.baseVal.value == pointarray[j][1]) {
							pointarray[j] = [0, 0];
						}
					}
					// console.log(Things[i].id[0]);
					pointarray.splice(jQuery.inArray([Things[i].x1.baseVal.value, Things[i].y1.baseVal.value], pointarray), 1);
					pointarray.splice(jQuery.inArray([Things[i].x2.baseVal.value, Things[i].y2.baseVal.value], pointarray), 1);
					if (Things[i].id[0] == 'a') {
						$('#alligatorCircle1_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
						$('#alligatorCircle2_' + Things[i].id[Things[i].id.length - 2] + Things[i].id[Things[i].id.length - 1]).remove();
						$('#' + Things[i].id).remove();
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
	$('#powersupply13').css('background-color', 'White');
	var canvas = $('#myCanvas');
	var context = canvas.get(0).getContext('2d');
	var current_x = 0;
	context.strokeStyle = 'rgb(208, 208, 208)';
	context.fillStyle = 'rgb(88, 88, 88)';
	current_x = 0;

	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 12; i++) {
			current_x = current_x + 20;
			context.fillRect(60 + 20 * j, current_x, 10, 10);
		}
		current_x = 0;
	}
	context.fillStyle = 'rgb(88,88,88)';
	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 12; i++) {
			current_x = current_x + 20;
			context.fillRect(160 + 20 * j, current_x, 10, 10);
		}
		current_x = 0;
	}
	current_x = 0;
	for (var j = 0; j < 12; j++) {
		current_x = current_x + 20;
		context.fillRect(260, current_x, 10, 10);
	}
	current_x = 0;
	for (var j = 0; j < 12; j++) {
		current_x = current_x + 20;
		context.fillRect(280, current_x, 10, 10);
	}

	zeroRed();
});
function toggleDelButton() {
	if (drawAlligator == 1) {
		$this = $('#addAlligator');
		$this.css('background-color', 'white');
		drawAlligator = 0;
	}
	$this = $('#del');
	if (deletemode == 1) {
		$this.css('background-color', 'white');
		delALLalligator = null;
		deletemode = 0;
	} else {
		$this.css('background-color', 'red');
		deletemode = 1;
	}
}

function toggleAlligatorButton() {
	if (deletemode == 1) {
		$('#del').css('background-color', 'white');
		delALLalligator = null;
		deletemode = 0;
	}
	$this = $('#addAlligator');
	if (drawAlligator == 1) {
		$this.css('background-color', 'white');
		drawAlligator = 0;
	} else {
		$this.css('background-color', 'red');
		drawAlligator = 1;
	}
}

const MaxNodeNum = 100;

function findNodeNum(x, y) {
	//multimeter 點還沒做
	//node 0~19 保留做特殊用途
	let alligatorNodeList = [
		{ x: 1285, y: 545 },
		{ x: 1250, y: 545 },
		{ x: 1385, y: 545 },
		{ x: 1350, y: 545 },
		{ x: 85, y: 565 },
		{ x: 145, y: 565 },
		{ x: 205, y: 565 },
		{ x: 355, y: 480 },
		{ x: 405, y: 480 },
		{ x: 455, y: 480 },
	]; //length : 10

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
			node2: findNodeNum(alligator.x2.baseVal.value - offsetX, alligator.y2.baseVal.value - offsetY),
		};
	});
	// for (let i = 0; i < alligatorOut.length; i++) {
	//     var alligator = alligatorOut[i];
	//     console.log(alligator.id, alligator.x1, alligator.y1, alligator.x2, alligator.y2);
	// }
	return alligatorOut;
}

function abs(x) {
	if (x < 0) {
		return -x;
	}
	return x;
}

function checkMeter(FG, x) {
	let result = { voltage: '', current: '' };
	for (let i = 0; i < this.n; i++) {
		//存答案
		if (x[i] == NaN) {
			result.voltage = 'ERR';
			result.current = 'ERR';
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

function checkResitanceBurn(x) {
	//return false;
	for (let i = 0; i < edge_list.length; i++) {
		let e = edge_list[i];
		if (e.type == 'resistance' && x[e.id] * x[e.id] * e.ohm > 0.125) {
			show_error('電阻燒壞了<br> at least one resistor burned');
			return true;
		}
	}
	return false;
}

function distance(point1, point2) {
	let delta_x = point1.x - point2.x;
	let delta_y = point1.y - point2.y;
	return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

function checkCircuit() {
	alli = getAlligator();
	console.log(alli);
	let power_pos = { x: -1, y: -1 },
		power_neg = { x: -1, y: -1 };
	let multer_pos = { x: -1, y: -1 },
		multer_neg = { x: -1, y: -1 };
	let power1 = { voltage: 'ERR', current: 'ERR' };
	let power2 = { voltage: 0, current: 0 };
	let meter = { voltage: 'ERR' };
	for (let i = 0; i < alli.length; i++) {
		tmp = alli[i];
		console.log(tmp);
		if (tmp.node1 == 4) {
			multer_pos.x = tmp.x2;
			multer_pos.y = tmp.y2;
		} else if (tmp.node1 == 5) {
			multer_neg.x = tmp.x2;
			multer_neg.y = tmp.y2;
		} else if (tmp.node1 == 1) {
			power_neg.x = tmp.x2;
			power_neg.y = tmp.y2;
		} else if (tmp.node1 == 0) {
			power_pos.x = tmp.x2;
			power_pos.y = tmp.y2;
		} else {
			show_error('電壓計的正極放錯了。');
			return { meter: meter, power1: power1, power2: power2 };
		}
	}
	console.log(power_pos.x, power_pos.y);
	console.log(power_neg.x, power_neg.y);
	console.log(multer_pos.x, multer_pos.y);
	console.log(multer_neg.x, multer_neg.y);
	if (multer_neg.x != 27 || multer_neg.y != 127) {
		show_error('負極要放左邊');
		return { meter: meter, power1: power1, power2: power2 };
	}
	if (power_pos.x == -1 || power_neg.x == -1 || multer_neg.x == -1 || multer_pos.x == -1) {
		show_error('電功或電壓計沒有夾到鱷魚夾');
		return { meter: meter, power1: power1, power2: power2 };
	}
	if (power_neg.x != multer_neg.x || power_neg.y != multer_neg.y) {
		show_error('電功與電錶的負極要接再一起');
		return { meter: meter, power1: power1, power2: power2 };
	}
	power1.voltage = voltage1;
	power1.current = current1;
	if (panel == 'zeroRed') {
		meter.voltage = power1.voltage * p2p[(multer_pos.x - 67) / 20 + 1][(multer_pos.y - 27) / 20 + 1];
	} else if (panel == 'oneRed') {
		meter.voltage = power1.voltage * p2l[(multer_pos.x - 67) / 20 + 1][(multer_pos.y - 27) / 20 + 1];
	} else if (panel == 'twoRed') {
		meter.voltage = power1.voltage * l2l[(multer_pos.x - 67) / 20 + 1][(multer_pos.y - 27) / 20 + 1];
	}
	console.log(meter.voltage);
	if (power1.voltage == 0) {
		power1 = { voltage: 0, current: 0 };
	}
	return { meter: meter, power1: power1, power2: power2 };
}

function check() {
	show_error('');
	if (startbool == false) {
		alert('請先填寫個人資料(please submit personal information first)');
		return;
	}
	if (powersupplyOutputStatus == 0) {
		show_error('記得開 output');
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

	vol1.innerHTML = res.power1.voltage == 'ERR' ? res.power1.voltage : res.power1.voltage.toFixed(2);
	cur1.innerHTML = res.power1.current == 'ERR' ? res.power1.current : (0.0).toFixed(2);
	vol2.innerHTML = res.power2.voltage == 'ERR' ? res.power2.voltage : res.power2.voltage.toFixed(2);
	cur2.innerHTML = res.power2.current == 'ERR' ? res.power2.current : (0.0).toFixed(2);
	if (meter1_mode == 0) {
		$('#multimeter1_3').text('');
	} else if (va.voltage == 'ERR') {
		$('#multimeter1_3').text(va.voltage);
	} else if (meter1_mode == 1) {
		let v = va.voltage.toFixed(0);
		if (v > 600) v = 'OverFlow';
		$('#multimeter1_3').text(v);
	} else if (meter1_mode == 2) {
		let v = va.voltage.toFixed(0);
		if (v > 200) v = 'OverFlow';
		$('#multimeter1_3').text(v);
	} else if (meter1_mode == 3) {
		let v = va.voltage.toFixed(1);
		if (v > 20) v = 'OverFlow';
		$('#multimeter1_3').text(v);
	} else if (meter1_mode == 4) {
		let v = va.voltage.toFixed(2);
		if (v > 2) v = 'OverFlow';
		$('#multimeter1_3').text(v);
	}
	return;
}

linestack = [];
function undo() {
	if (linestack.length == 0) {
		return;
	}
	let target = linestack.length - 1;
	pointarray = deleteRow(pointarray, pointarray.length - 1);
	pointarray = deleteRow(pointarray, pointarray.length - 1);
	if (linestack[target][0] == 'a') {
		$('#alligatorCircle1_' + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
		$('#alligatorCircle2_' + linestack[target][linestack[target].length - 2] + linestack[target][linestack[target].length - 1]).remove();
		$('#' + linestack[target]).remove();
		delALLalligator = null;
	}
	linestack.pop();
	check();
}
function KeyPress(e) {
	var evtobj = window.event ? event : e;
	if (evtobj.keyCode == 90 && evtobj.ctrlKey) undo();
	if (evtobj.keyCode == 65) toggleAlligatorButton();
	if (evtobj.keyCode == 68) toggleDelButton();
}

document.onkeydown = KeyPress;

function reload() {
	if (!confirm('確定要清除全部嗎？\nAre you sure to reload？')) {
		return;
	}
	for (var i = 0; i < 100; i++) {
		undo();
	}
}

window.onbeforeunload = () => {
	return confirm('確定要離開?');
};

function start() {
	console.log('Starting');

	// check id input
	let id = parseInt($('#id1')[0].value, 10);
	if (isNaN(id)) {
		alert('學號輸入錯誤。\nStudent Id number error.');
		return;
	}

	startbool = true;
	let date = new Date();
	let time = String(date.getFullYear()) + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0') + ' ' + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
	$('#time1').text(time);
	$('#name2').text($('#name1')[0].value);
	$('#id2').text($('#id1')[0].value);
	$('#class2').text($('#class1')[0].value);
	$('#name1').css('display', 'none');
	$('#id1').css('display', 'none');
	$('#class1').css('display', 'none');
	$('#submitbuttom').css('display', 'none');
	$('#powersupply13').css('background-color', 'Lightgreen');

	power = 1;
	powersupplyOutputStatus = 1;
	id %= 100;
	current1 = 0.1;
	voltage1 = (id / 2 + 50) / 10;
	cur1.innerHTML = (0.0).toFixed(2);
	vol1.innerHTML = voltage1.toFixed(2);
	if (id % 3 == 0) {
		zeroRed();
	} else if (id % 3 == 1) {
		oneRed();
	} else {
		twoRed();
	}
	check();
}
function checkAns() {
	if (!startbool) return;
	let ans1 = parseFloat($('#ans1')[0].value);
	let ans2 = parseFloat($('#ans2')[0].value);
	let ans3 = parseFloat($('#ans3')[0].value);
	// zeroRed
	let answer1 = voltage1 * p2p[4][9];
	let answer2 = voltage1 * p2p[6][9];
	let answer3 = voltage1 * p2p[8][9];

	if (panel == 'oneRed') {
		answer1 = voltage1 * p2l[4][9];
		answer2 = voltage1 * p2l[6][9];
		answer3 = voltage1 * p2l[8][9];
	} else if (panel == 'twoRed') {
		answer1 = voltage1 * l2l[4][9];
		answer2 = voltage1 * l2l[6][9];
		answer3 = voltage1 * l2l[8][9];
	}

	let done = true;
	if (isNaN(ans1) || isNaN(ans2) || isNaN(ans3)) {
		done = false;
	}
	if (answer1 > 2) {
		if (abs(ans1 - answer1) > 0.05) {
			done = false;
		}
	} else {
		if (abs(ans1 - answer1) > 0.005) {
			done = false;
		}
	}
	if (answer2 > 2) {
		if (abs(ans2 - answer2) > 0.05) {
			done = false;
		}
	} else {
		if (abs(ans2 - answer2) > 0.005) {
			done = false;
		}
	}
	if (answer3 > 2) {
		if (abs(ans3 - answer3) > 0.05) {
			done = false;
		}
	} else {
		if (abs(ans3 - answer3) > 0.005) {
			done = false;
		}
	}
	if (done) {
		$('#anstext1').text($('#ans1')[0].value);
		$('#anstext2').text($('#ans2')[0].value);
		$('#anstext3').text($('#ans3')[0].value);
		$('#ansStatus').text('通過');
		$('#ans1').css('display', 'none');
		$('#ans2').css('display', 'none');
		$('#ans3').css('display', 'none');
	} else {
		$('#ansStatus').text('錯誤');
	}
}
function show_error(s) {
	document.querySelector('#error_message_content').innerHTML = s;
}

const panel_mode = ['zeroRed', 'oneRed', 'twoRed'];
var panel = panel_mode[0];

// line in board(圓點、直線)
function updateLine(fillColor, leftpos) {
	var canvas = $('#myCanvas');
	var context = canvas.get(0).getContext('2d');
	context.lineWidth = 4;
	context.fillStyle = fillColor;
	context.strokeStyle = fillColor;
	context.beginPath(); // Start the path
	context.moveTo(leftpos, 0); // Set the path origin
	context.lineTo(leftpos, 270); // Set the path destination
	context.closePath(); // Close the path
	context.stroke(); // Outline the path
}

// circle in board(圓點、直線)
function updateCircle(fillColor, leftpos) {
	var canvas = $('#myCanvas');
	var context = canvas.get(0).getContext('2d');
	context.fillStyle = fillColor;
	context.strokeStyle = fillColor;
	context.beginPath();
	context.arc(leftpos, 125, 25, 0, 2 * Math.PI);
	context.stroke();
	context.fill();
}

//rectangle(正負極)
function updateRectangle() {
	var canvas = $('#myCanvas');
	var context = canvas.get(0).getContext('2d');
	context.fillStyle = 'rgb(88, 88, 88)';
	context.fillRect(20, 120, 10, 10);
	context.fillRect(320, 120, 10, 10);
}
function zeroRed() {
	panel = panel_mode[0];
	$('#zeroRed').css('background-color', 'rosybrown');
	$('#oneRed').css('background-color', 'white');
	$('#twoRed').css('background-color', 'white');

	updateLine('#FFF5EB', 25);
	updateLine('#FFF5EB', 325);
	updateCircle('silver', 25);
	updateCircle('silver', 325);
	updateRectangle();
}

function oneRed() {
	panel = panel_mode[1];
	$('#zeroRed').css('background-color', 'white');
	$('#oneRed').css('background-color', 'rosybrown');
	$('#twoRed').css('background-color', 'white');

	updateLine('#FFF5EB', 25);
	updateCircle('#FFF5EB', 325);

	updateCircle('silver', 25);
	updateLine('silver', 325);

	updateRectangle();
}

function twoRed() {
	panel = panel_mode[2];
	$('#zeroRed').css('background-color', 'white');
	$('#oneRed').css('background-color', 'white');
	$('#twoRed').css('background-color', 'rosybrown');

	updateCircle('#FFF5EB', 25);
	updateCircle('#FFF5EB', 325);
	updateLine('silver', 25);
	updateLine('silver', 325);

	updateRectangle();
}

var p2p = [
	[0.3728953028909902, 0.36852353115519765, 0.3546851406881697, 0.3286786761464262, 0.28334487044193357, 0.19783161987672473, 0.0, 0.2004878624837686, 0.2888218786500252, 0.33732043934089906, 0.3670489722245846, 0.3854431874730213, 0.3955972168671084, 0.39885348183498653],
	[0.3772670746267828, 0.3732568405208154, 0.3607691777255274, 0.33834234672780084, 0.3034345928722917, 0.25399080453248274, 0.20181598378729068, 0.2565647856425246, 0.3087396063877165, 0.3467054532444934, 0.372716131042209, 0.38956328040019617, 0.39904609908021293, 0.40210974680286476],
	[0.38965931457451036, 0.38646757857575387, 0.376792382965324, 0.360486940166958, 0.3380603497869498, 0.3128810215936238, 0.2967083449741555, 0.31521568991132276, 0.342866308013823, 0.368045636207149, 0.38754681829956206, 0.4010477040053415, 0.40891415225068267, 0.4114933072160466],
	[0.40843502651975094, 0.40616177624236577, 0.39944583539305684, 0.38875268118775735, 0.375438844514926, 0.36276458708090725, 0.35692068460438464, 0.36472332101478816, 0.3794642995491039, 0.3950639652707175, 0.40837780194354883, 0.4181665650709255, 0.4240694987011295, 0.42603517755995657],
	[0.43175723901976215, 0.4302986644809014, 0.42607650117678053, 0.41963910467608867, 0.41217776000408957, 0.40581779761069464, 0.40348648534768805, 0.40729260999434125, 0.4152036038970872, 0.4243681233830685, 0.43273385913299034, 0.439171255633682, 0.44316209992295347, 0.44450840562152083],
	[0.4579966005974949, 0.45719914148469754, 0.45492240015707497, 0.4515494763357275, 0.4478152932146491, 0.4448423580100939, 0.4439148491813315, 0.44575702971780184, 0.44968938266183517, 0.454471065231479, 0.4590182555716621, 0.46262249840785896, 0.4648992397354815, 0.4656742450802202],
	[0.48583088040082256, 0.4855789007033189, 0.48486448163109436, 0.48382110729509753, 0.48269157850868555, 0.48182149203370045, 0.48157352364974243, 0.48213127703369946, 0.483325831800973, 0.4848084993093503, 0.48624559951432034, 0.48740124269061025, 0.4881381155308934, 0.48839009522839705],
	[0.5141691195991577, 0.5144210992966614, 0.515135518368886, 0.5161788927048829, 0.5173084214912951, 0.5181785079662802, 0.5184264763502382, 0.5178687229662808, 0.516674168199007, 0.5151915006906291, 0.5137544004856587, 0.5125987573093684, 0.511861884469085, 0.5116099047715813],
	[0.5420033994024855, 0.5428008585152829, 0.5450775998429057, 0.5484505236642532, 0.5521847067853318, 0.555157641989887, 0.5560851508186494, 0.5542429702821788, 0.550310617338145, 0.5455289347685006, 0.5409817444283171, 0.5373775015921199, 0.5351007602644972, 0.5343257549197583],
	[0.5682427609802184, 0.5697013355190793, 0.5739234988232005, 0.5803608953238926, 0.587822239995892, 0.5941822023892871, 0.5965135146522937, 0.5927073900056401, 0.5847963961028936, 0.5756318766169116, 0.5672661408669891, 0.560828744366297, 0.5568379000770254, 0.5554915943784579],
	[0.59156497348023, 0.5938382237576153, 0.6005541646069247, 0.6112473188122246, 0.6245611554850566, 0.6372354129190758, 0.6430793153955985, 0.6352766789851945, 0.6205357004508778, 0.6049360347292633, 0.5916221980564311, 0.5818334349290539, 0.5759305012988496, 0.5739648224400222],
	[0.6103406854254709, 0.6135324214242276, 0.623207617034658, 0.6395130598330248, 0.6619396502130339, 0.6871189784063612, 0.7032916550258301, 0.6847843100886617, 0.6571336919861599, 0.6319543637928327, 0.6124531817004184, 0.5989522959946382, 0.5910858477492966, 0.5885066927839324],
	[0.6227329253731988, 0.6267431594791664, 0.6392308222744549, 0.6616576532721826, 0.6965654071276934, 0.7460091954675049, 0.7981840162126993, 0.7434352143574625, 0.6912603936122679, 0.6532945467554889, 0.6272838689577719, 0.6104367195997837, 0.6009539009197664, 0.5978902531971144],
	[0.6271046971089915, 0.6314764688447843, 0.6453148593118129, 0.6713213238535576, 0.7166551295580524, 0.8021683801232655, 1.0, 0.7995121375162213, 0.7111781213499601, 0.6626795606590836, 0.6329510277753965, 0.6145568125269587, 0.6044027831328711, 0.6011465181649928],
];
var p2l = [
	[0.5300988613594619, 0.5238815172302702, 0.5042123031758248, 0.4672765337245282, 0.40291474586311793, 0.28143737829229754, 0.0, 0.2867390804340536, 0.4136876606659232, 0.48388061552018413, 0.52724601870561, 0.5542728762832092, 0.5692749794977807, 0.5741003457824955],
	[0.5363162054886537, 0.5306074521928972, 0.5128455808742504, 0.48098954292958507, 0.43147253571782307, 0.3614173836530361, 0.2876869004088336, 0.3666343305351456, 0.4420654733547276, 0.4972943913546017, 0.5354152915095235, 0.5602852534647231, 0.5743633479627092, 0.5789257120672102],
	[0.5539510562093586, 0.5493865051784148, 0.5355730251986945, 0.5123635214017385, 0.4805684704255532, 0.4450727201931902, 0.4226958874471528, 0.45004586794296764, 0.49064551086324004, 0.5278161850339717, 0.5568355025131594, 0.5770894981034506, 0.5889674468211227, 0.5928758065609274],
	[0.580715008991951, 0.5774144871127088, 0.5676964933403748, 0.5523230470531213, 0.5333651043894612, 0.5156091392470189, 0.5079780612436198, 0.5202077429263321, 0.5426545171212935, 0.5664893354048858, 0.5870210354056918, 0.6022697896147972, 0.6115411346574035, 0.6146426205342543],
	[0.6140800055330283, 0.6118599409400947, 0.6054754139969742, 0.5958670690809107, 0.5849597608321513, 0.5760206711618046, 0.5733994753539753, 0.5801525253974473, 0.5932754792907161, 0.6084656040585863, 0.6224895140899249, 0.6334274902926431, 0.6402846816594396, 0.6426124062612827],
	[0.6518851312599729, 0.6504698571176675, 0.6464781526265169, 0.6407100544413962, 0.634586198696429, 0.6301143092140729, 0.6294466436130297, 0.6337274040187657, 0.6418292705855373, 0.6516080874488186, 0.6610439266027788, 0.6686659758064109, 0.6735576954264293, 0.6752376411919971],
	[0.6925208052715286, 0.6916562036440856, 0.6892572849500298, 0.6859087973617282, 0.6825606702980958, 0.6804037233850285, 0.680545385865305, 0.6834811764790488, 0.6887061115838489, 0.6950935485483718, 0.7014121290659607, 0.7066347909037922, 0.7100424830478695, 0.7112227676538474],
	[0.7348856825379704, 0.7343768672371169, 0.7329859861677885, 0.7311071797573909, 0.7293439617491975, 0.7283945281626405, 0.7288499999841133, 0.7309458044482757, 0.7344204507224377, 0.7386478660948592, 0.7428762502089001, 0.746418575694928, 0.7487546782074094, 0.7495684633276536],
	[0.7782681904061192, 0.7779795965986234, 0.7772026127266167, 0.7761899737508495, 0.7753134687786627, 0.7749804275322227, 0.7755142814602319, 0.7770315906075033, 0.7793820207627669, 0.7822012148997273, 0.7850264299798528, 0.7874085834596103, 0.7889891907591864, 0.7895417292419484],
	[0.8222278858892595, 0.8220707160246409, 0.8216548943892058, 0.8211366337407281, 0.8207395120823814, 0.820699431727356, 0.8211951077170886, 0.8222842557587389, 0.8238748268213995, 0.8257485427614301, 0.827619671351174, 0.8292001374044737, 0.8302517721277776, 0.8306200721217676],
	[0.8665019211016372, 0.8664204872214749, 0.8662096150648373, 0.8659621547404757, 0.8658085140827788, 0.8658826795777312, 0.8662824619220277, 0.8670354978889645, 0.8680844880026621, 0.8692984579734195, 0.8705035752589396, 0.871520522679333, 0.8721976882256828, 0.872435014989567],
	[0.9109388240743392, 0.9108996966947845, 0.9108009239081928, 0.9106938560735586, 0.9106497099305267, 0.9107403105787623, 0.9110165625043267, 0.9114907858724292, 0.9121291693268653, 0.9128572258706465, 0.9135756490318323, 0.9141806898282363, 0.9145834431060537, 0.9147246113851346],
	[0.9554539818061505, 0.9554385515751315, 0.9554005277995907, 0.9553626357150391, 0.9553561589870074, 0.9554122903024644, 0.9555526916440877, 0.9557819137695601, 0.9560841775617236, 0.9564256271504693, 0.956761105169507, 0.9570431444957261, 0.957230782985161, 0.9572965443388641],
	[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
];
var l2l = [
	[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
	[0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646, 0.07692307692307646],
	[0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529, 0.1538461538461529],
	[0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942, 0.23076923076922942],
	[0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593, 0.30769230769230593],
	[0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247, 0.38461538461538247],
	[0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591, 0.4615384615384591],
	[0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359, 0.5384615384615359],
	[0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128, 0.6153846153846128],
	[0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898, 0.6923076923076898],
	[0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672, 0.7692307692307672],
	[0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447, 0.8461538461538447],
	[0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222, 0.9230769230769222],
	[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
];

const mediaStreamConstraints = {
	video: true,
};

function handleMediaStreamError(error) {
	console.log('navigator.getUserMedia error: ', error);
}

function gotLocalMediaStream(mediaStream) {
	// console.log(mediaStream)
	const localStream = mediaStream;

	// 取的video html element( HTMLMediaElement ).
	const localVideo = document.querySelector('video');
	// Older browsers may not have srcObject.
	if ('srcObject' in localVideo) {
		localVideo.srcObject = localStream;
	} else {
		// Avoid using this in new browsers, as it is going away.
		localVideo.src = window.URL.createObjectURL(localStream);
	}
}

navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(gotLocalMediaStream).catch(handleMediaStreamError);
