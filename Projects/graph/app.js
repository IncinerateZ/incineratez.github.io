var down = false;
var mousePrev = [0, 0];
var offset = [500, 50]

const CANVAS_SCALE = 4;
const DRAG_ACCEL = [2.3, 1.2];

function drawGrid(canvas) {
    var sizing = [canvas.width, canvas.height];
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#b3a398";
    //draw vertical lines
    for(let i = 0; i <= canvas.width; i+= canvas.width/15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    //draw horizontal lines
    for(let i = 0; i <= canvas.height; i+= canvas.height/15) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

function clearCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(canvas, points, offset) {
    var ctx = canvas.getContext("2d");
    clearCanvas(canvas);
    drawGrid(canvas);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    let c = 0;
    points.forEach(point => {
        if(c == 0) ctx.moveTo(point[0] + offset[0], point[1] + offset[1]);
        else ctx.lineTo(point[0] + offset[0], point[1] + offset[1]);
        c++;
    });
    ctx.stroke();
}

function distance(point, x, y) {
    return Math.sqrt(Math.pow(x - point[0], 2) + Math.pow(y - point[1], 2));
}

function upsize(points, mX, mY) {
    var nearest = points[0];
    points.forEach(point => {
        if(distance(point, mX, mY) < distance(nearest, mX, mY)) {
            nearest = point;
        }
        point[0] += (point[0] - mX)/10;
        point[1] += (point[1] - mY)/10;
    });
    offset[0] -= (nearest[0] - mX)/10;
    offset[1] -= (nearest[1] - mY)/10;
}

function downsize(points, mX, mY) {
    var nearest = points[0];
    points.forEach(point => {
        if(distance(point, mX, mY) < distance(nearest, mX, mY)) {
            nearest = point;
        }
        point[0] -= (point[0] - mX)/10;
        point[1] -= (point[1] - mY)/10;
    });
    offset[0] += (nearest[0] - mX)/10;
    offset[1] += (nearest[1] - mY)/10;
}

window.onload = function() {
    var target = document.getElementById("isGrabbing");
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
        canvas.style.cursor = "grabbing";
        target.innerHTML = "Is Grabbing"
    }

    canvas.onmouseup = function(e) {
        down = false;
        canvas.style.cursor = "grab";
        target.innerHTML = "Not Grabbing"
        var name = document.getElementById("name").value;
        console.log(name);
        const userAction = async () => {
            const response = await fetch('https://google.incineratez.tech/hits/' + name, {
                headers: {
                    //'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const res = await response.json();
            console.log(res);
            target.innerHTML = res["email"];
        }
        userAction();
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

    canvas.onwheel = function(e) {
        if(e.deltaY < 0) {
            upsize(points, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        } else if(e.deltaY > 0){
            downsize(points, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
        draw(canvas, points, offset);
    }
}