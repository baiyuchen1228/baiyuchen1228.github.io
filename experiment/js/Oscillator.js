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
        this._loop = 100;   // 傅立葉轉換做的項數
        this._level = 0.00005;
        this._slope = 1;
        this._reference = "CH1";
        this._show_mode = "CH1";
        this._init = false;     // 校正 SWP 用
        this._SWP = 1;
        this._begin = -1; // slope, level 下波的起始位置
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
            // 校正(SWP)用
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
        let is_find_begin = false;
        let timeslot = 0.4 / wg.frequency / this._WAVE_DATA_COUNT; // 用週期去切格子
        if(this._begin == -1){
            is_find_begin = true;
        }else{
            this._begin *= timeslot;
            this._begin -= this._time_offset;
        }
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
                    if(is_find_begin){
                        this._datapoints0[j] += wg.voltage(j * timeslot, 2 * i + 1, omega, phase0, amplitude0);
                        this._datapoints1[j] += wg.voltage(j * timeslot, 2 * i + 1, omega, phase1, amplitude1);
                    }else{
                        this._datapoints0[j] += wg.voltage((j + this._time_offset) * this._time_mul + this._begin, 2 * i + 1, omega, phase0, amplitude0);
                        this._datapoints1[j] += wg.voltage((j + this._time_offset) * this._time_mul + this._begin, 2 * i + 1, omega, phase1, amplitude1);
                    }
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
                    if(is_find_begin){
                        this._datapoints0[j] += wg.voltage(j * timeslot, pow(-1,i) * (2 * i + 1) * (2 * i + 1), omega, phase0, amplitude0);
                        this._datapoints1[j] += wg.voltage(j * timeslot, pow(-1,i) * (2 * i + 1) * (2 * i + 1), omega, phase1, amplitude1);
                    }else{
                        this._datapoints0[j] += wg.voltage((j + this._time_offset) * this._time_mul + this._begin, pow(-1,i) * (2 * i + 1) * (2 * i + 1), omega, phase0, amplitude0);
                        this._datapoints1[j] += wg.voltage((j + this._time_offset) * this._time_mul + this._begin, pow(-1,i) * (2 * i + 1) * (2 * i + 1), omega, phase1, amplitude1);
                    }
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
                if(is_find_begin){
                    this._datapoints0[i] = wg.voltage(i * timeslot, 1, omega, phase0, amplitude0);
                    this._datapoints1[i] = wg.voltage(i * timeslot, 1, omega, phase1, amplitude1);
                }else{
                    this._datapoints0[i] = wg.voltage((i + this._time_offset) * this._time_mul + this._begin, 1, omega, phase0, amplitude0);
                    this._datapoints1[i] = wg.voltage((i + this._time_offset) * this._time_mul + this._begin, 1, omega, phase1, amplitude1);
                } 
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
        
        this._begin = -1;
        this.get_data();    // 找一個週期下的波圖
        let datapoints0 = [];
        let datapoints1 = [];

        // 開找符合條件的 begin
        this._begin = 1;
        let flag = false;
        let pre = this._datapoints0[this._begin] / this._vertical_v[0];
        // pre += this._vertical_offset[0];
        if(this._reference == "CH2"){
            pre = this._datapoints1[this._begin] / this._vertical_v[1];
            // pre += this._vertical_offset[1];
        }


        for(;this._begin < 2 * this._WAVE_DATA_COUNT && flag == false;this._begin++){
            let temp = 0;
            // let temp_level = this._level;
            if(this._reference == "CH1"){
                temp = this._datapoints0[this._begin] / this._vertical_v[0];
                // temp += this._vertical_offset[0];
            }else{
                temp = this._datapoints1[this._begin] / this._vertical_v[1];
                // temp += this._vertical_offset[1];
            }
            if(this._slope == 1 && pre <= this._level+0.05 && temp >= this._level-0.05 && pre <= temp){
                flag = true;
            }else if(this._slope == -1 && pre >= this._level-0.05 && temp <= this._level+0.05 && pre >= temp){
                flag = true;
            }
            pre = temp;
        }
        this._begin -= 1;
        if(flag == false){
            for(let i=0;i<this._WAVE_DATA_COUNT;i++){
                datapoints0[i] = 0.008 * i - 4;
                datapoints1[i] = 4 - 0.008 * i;
            }
            show_error("trigger level is out of range!");
        }else{
            this.get_data(); // 找示波器要畫出來的資料
            
            for(let i=0;i < (this._WAVE_DATA_COUNT);i++){
                if(this._show_mode != 'CH2'){
                    datapoints0[i] = this._datapoints0[i] / this._vertical_v[0];
                    datapoints0[i] += this._vertical_offset[0];
                }else{
                    datapoints0[i] = NaN;
                }

                if(this._show_mode != 'CH1'){
                    datapoints1[i] = this._datapoints1[i] / this._vertical_v[1];
                    datapoints1[i] += this._vertical_offset[1];
                }else{
                    datapoints1[i] = NaN;
                }
            }
        }

        if(this._show_mode != "CH2" && this._vertical_AC_GND_DC[0] == "GND"){
            for(let i=0;i < (this._WAVE_DATA_COUNT);i++){
                datapoints0[i] = 0;
                datapoints0[i] += this._vertical_offset[0];
            }
        }else if(this._show_mode == "CH2"){
            for(let i=0;i < (this._WAVE_DATA_COUNT);i++){
                datapoints0[i] = NaN;
            }
        }

        if(this._show_mode != "CH1" && this._vertical_AC_GND_DC[1] == "GND"){
            for(let i=0;i < (this._WAVE_DATA_COUNT);i++){
                datapoints1[i] = 0;
                datapoints1[i] += this._vertical_offset[1];
            }
        }else if(this._show_mode == "CH1"){
            for(let i=0;i < (this._WAVE_DATA_COUNT);i++){
                datapoints1[i] = NaN;
            }
        }

        if(this._power == 0){
            show_error("示波器的 power 沒有打開");
            for(let i=0;i < (this._WAVE_DATA_COUNT);i++){
                datapoints0[i] = NaN;
                datapoints1[i] = NaN;
            }
        }
        this.drawChart(datapoints0, datapoints1);
    }
    drawChart(datapoints0, datapoints1){
        
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