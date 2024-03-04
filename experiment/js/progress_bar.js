

var progress_bar_i = 0;
function move() {
    if (progress_bar_i == 0) {
        progress_bar_i = 1;
        var elem = document.getElementById("myBar");
        var width = 0;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                progress_bar_i = 0;
                elem.style.width = "0%";
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}
