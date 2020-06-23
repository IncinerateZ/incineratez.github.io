var down = false;
var mousePrev = [0, 0];
var offset = [500, 50]

const CANVAS_SCALE = 4;
const DRAG_ACCEL = [2.3, 1.2];

function clearCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(canvas, points, offset) {
    var ctx = canvas.getContext("2d");
    clearCanvas(canvas);
    ctx.fillStyle = "black";
    ctx.beginPath();
    let c = 0;
    points.forEach(point => {
        if(c == 0) ctx.moveTo(point[0] + offset[0], point[1] + offset[1]);
        else ctx.lineTo(point[0] + offset[0], point[1] + offset[1]);
        c++;
    });
    ctx.stroke();
}

window.onload = function() {
    //canvas setup
    const canvas = document.getElementById("canvas");
    //console.log(canvas.width * CANVAS_SCALE + " " + canvas.height * CANVAS_SCALE);
    var ctx = canvas.getContext("2d");
    canvas.width *= CANVAS_SCALE;
    canvas.height *= CANVAS_SCALE;
    ctx.fillStyle = "black";

    var points = [[0, 0], [200, 0], [200, 50], [0, 50], [0, 0]];

    draw(canvas, points, offset);

    //Mouse Listeners
    canvas.onmousedown = function(e) {
        down = true;
        mousePrev = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    }

    canvas.onmouseup = function(e) {
        down = false;
    }

    canvas.onmousemove = function(e) {
        if(!down) return;
        var x = e.clientX - canvas.offsetLeft; //x position within the element.
        var y = e.clientY - canvas.offsetTop; //y position within the element.
        offset = [offset[0] + (x - mousePrev[0]) * DRAG_ACCEL[0], offset[1] + (y - mousePrev[1]) * DRAG_ACCEL[1]];
        //console.log(offset[0], offset[1]);
        draw(canvas, points, offset);
        mousePrev = [x, y];
    }
}