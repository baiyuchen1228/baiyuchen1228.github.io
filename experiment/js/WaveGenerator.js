class WaveGenerator{
    constructor(){
        
        this._power = false;

        this._AMPL_base = 1;
        this._AMPL_pow = 0;
        this._AMPL_switch_on = false;
        this._AMPL_20db_on = false;
        
        this._frequency_base = 1;
        this._frequency_pow = 3;
        
        this._inv = 1;
        this._offset = 0;
        this._cycle = 100000;
        this._type = "";
        this._offset_on = false;
        
        this._frequency = 1000; // 修改時要同時改 base 和 pow
        this._amplitude = 1; // 修改時要同時改 base 和 pow
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
    set_power(val){
        this._power = val;
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
    set_offset_on(val){
        this._offset_on = val;
    }
    set_AMPL_base(val){
        this._AMPL_base = val;
    }
    get power(){
        return this._power;
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
    evaluate_AMPL(){
        this.set_amplitude(this._AMPL_base * pow(10, this._AMPL_pow));
        check();
    }
    add_AMPL(){
        if(this._AMPL_base < 14){
            this._AMPL_base += 0.5;
        }
        this.evaluate_AMPL();
    }
    minus_AMPL(){
        if(this._AMPL_base > 0){
            this._AMPL_base -= 0.5;
        }
        this.evaluate_AMPL();
    }
    AMPL_switch(){
        if(this._AMPL_switch_on){
            this._AMPL_pow += 1;
            $("#generator_AMPL_switch").css("backgroundColor", "white");
            this._AMPL_switch_on = false;
        }
        else{
            this._AMPL_pow -= 1;
            $("#generator_AMPL_switch").css("backgroundColor", "green");
            this._AMPL_switch_on = true;
        }
        this.evaluate_AMPL();
    }
    AMPL_20db(){
        if(this._AMPL_20db_on){
            this._AMPL_pow += 1;
            $("#generator_AMPL1").css("backgroundColor", "white");
            this._AMPL_20db_on = false;
        }
        else{
            this._AMPL_pow -= 1;
            $("#generator_AMPL1").css("backgroundColor", "green");
            this._AMPL_20db_on = true;
        }
        this.evaluate_AMPL();
    }
    evaluate_frequency(){
        this._frequency = this._frequency_base.toFixed(2) * pow(10, this._frequency_pow.toFixed(0));
        $("#generator_frequency").text(this._frequency_base.toFixed(2));
        $("#generator_frequency_menu").text("10^"+this._frequency_pow.toFixed(0));
        this.set_frequency(this._frequency_base.toFixed(2) * pow(10, this._frequency_pow.toFixed(0)));
        check();
    }
    clear_frequency(){
        $("#generator_frequency6").css("backgroundColor", "white");
        $("#generator_frequency5").css("backgroundColor", "white");
        $("#generator_frequency4").css("backgroundColor", "white");
        $("#generator_frequency3").css("backgroundColor", "white");
        $("#generator_frequency2").css("backgroundColor", "white");
        $("#generator_frequency1").css("backgroundColor", "white");
        $("#generator_frequency0").css("backgroundColor", "white");
    }
    minus_frequency(){
        if(this._frequency_base < 0.2)return;
        this._frequency_base -= 0.1;
        this.evaluate_frequency();
    }
    add_frequency(){
        if(this._frequency_base > 2)return;
        this._frequency_base += 0.1;
        this.evaluate_frequency();
    }
    frequency_pow(pw){
        this.clear_frequency();
        $("#generator_frequency"+pw).css("backgroundColor", "green");
        this._frequency_pow = pw;
        this.evaluate_frequency();
    }
    generator_power(){
        if(this._power){
            $("#generator_power").css("backgroundColor", "white");
            this._power = false;
        }
        else{
            $("#generator_power").css("backgroundColor", "green");
            this._power = true;
        }
        check();
    }
    clear_generator_wave(){
        $("#generator_square").css("backgroundColor", "white");
        $("#generator_triangle").css("backgroundColor", "white");
        $("#generator_sin").css("backgroundColor", "white");
    }
    generator_type(t){
        this.clear_generator_wave();
        $("#generator_"+t).css("backgroundColor", "green");
        var wave_type = t+"_wave";
        $("#generator_wave_text").text(wave_type);
        this.set_type(wave_type);
        check();
    }
    generator_inv(){
        this.set_inv(this._inv * (-1));
        if(this._inv == 1){
            $("#generator_inv").css("backgroundColor", "white");
        }
        else{
            $("#generator_inv").css("backgroundColor", "green");
        }
        check();
    }
    minus_offset(){
        if(this._offset_on){
            if(this._offset < -30){
                osi.draw();
                return;
            }
            this.set_offset(this._offset - 0.1);
        }
        osi.draw();
    }
    add_offset(){
        if(this._offset_on){
            if(this._offset > 30){
                osi.draw();
                return;
            }
            wg.set_offset(this._offset + 0.1);
        }
        osi.draw();
    }
    generator_offset_on(){
        if(this._offset_on){
            $("#generator_offset_switch").css("backgroundColor", "white");
            this.set_offset_on(false);
        }
        else{
            $("#generator_offset_switch").css("backgroundColor", "green");
            this.set_offset(0);
            this.set_offset_on(true);
        }
        osi.draw();
    }
}