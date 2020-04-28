let thetaX = 0;
let thetaY = 0;
let thetaZ = 0;

var scale = 4;

let sens = 1;

var down = false;
var mousePrev = [];

let pMat = [
    [1,0,0],
    [0,1,0]
];

class Screen {
    static convert(x, y) {
        return [x, cHeight - y];
    }

    static convertP(point) {

    }
}

class MatMul {
    static mul(point3d) {
        let x1 = pMat[0][0] * point3d.x + pMat[0][1] * point3d.y + pMat[0][2] * point3d.z;
        let y1 = pMat[1][0] * point3d.x + pMat[1][1] * point3d.y + pMat[1][2] * point3d.z;
        return new Point2D(x1,y1);
    }

    static mul3(matrix, point3d, rot) {
        let x1 = matrix[0][0] * point3d.x + matrix[0][1] * point3d.y + matrix[0][2] * point3d.z;
        let y1 = matrix[1][0] * point3d.x + matrix[1][1] * point3d.y + matrix[1][2] * point3d.z;
        let z1 = matrix[2][0] * point3d.x + matrix[2][1] * point3d.y + matrix[2][2] * point3d.z;
        if(rot == 0) {
            y1 += 150*scale;
            z1 += 150*scale;
        } else if (rot == 1) {
            x1 += 150*scale;
            z1 += 150*scale;
        } else if (rot == 2) {
            x1 += 150*scale;
            y1 += 150*scale;
        }
        return new Point3D(x1, y1, z1);
    }

    static Rx(theta, point3d) {
        let y1 = point3d.y;
        let z1 = point3d.z;
        y1 -= 150*scale;
        z1 -= 150*scale;
        let Rx = [
            [1, 0, 0],
            [0, Math.cos(theta), -1 * Math.sin(theta)],
            [0, Math.sin(theta), Math.cos(theta)]
        ]
        return this.mul3(Rx, new Point3D(point3d.x, y1, z1), 0);
    }

    static Ry(theta, point3d) {
        let x1 = point3d.x;
        let z1 = point3d.z;
        x1 -= 150*scale;
        z1 -= 150*scale;
        let Ry = [
            [Math.cos(theta), 0, Math.sin(theta)],
            [0, 1, 0],
            [-1 * Math.sin(theta), 0, Math.cos(theta)]
        ]
        return this.mul3(Ry, new Point3D(x1, point3d.y, z1), 1);
    }

    static Rz(theta, point3d) {
        let x1 = point3d.x;
        let y1 = point3d.y;
        x1 -= 150*scale;
        y1 -= 150*scale;
        let Rz = [
            [Math.cos(theta), -1 * Math.sin(theta), 0],
            [Math.sin(theta), Math.cos(theta), 0],
            [0, 0, 1]
        ]
        return this.mul3(Rz, new Point3D(x1, y1, point3d.z), 2);
    }
}

class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get coords() {
        return [this.x, this.y, this.z];
    }

    convert2d() {
        return MatMul.mul(this);
    }
}

function draw() {
    let newPoints = [];
    let i = 0;
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 0, 300*scale, 300*scale);
    ctx.fillStyle = "#000000";
    points.forEach(point => {
        point = MatMul.Rx(thetaX, point);
        point = MatMul.Ry(thetaY, point);
        point = MatMul.Rz(thetaZ, point);
        ctx.fillRect(point.convert2d().x, (cHeight - point.convert2d().y/2), 2, 1);
        i++;
        newPoints[i] = point;
    });
    //Draw Lines
    ctx.beginPath();
    ctx.moveTo(newPoints[1].convert2d().x, (cHeight - newPoints[1].convert2d().y/2));
    
    ctx.lineTo(newPoints[2].convert2d().x, (cHeight - newPoints[2].convert2d().y/2));
    ctx.lineTo(newPoints[3].convert2d().x, (cHeight - newPoints[3].convert2d().y/2));
    ctx.lineTo(newPoints[4].convert2d().x, (cHeight - newPoints[4].convert2d().y/2));
    ctx.lineTo(newPoints[1].convert2d().x, (cHeight - newPoints[1].convert2d().y/2));
    
    ctx.lineTo(newPoints[5].convert2d().x+1, (cHeight - newPoints[5].convert2d().y/2));
    ctx.lineTo(newPoints[6].convert2d().x+1, (cHeight - newPoints[6].convert2d().y/2));
    ctx.lineTo(newPoints[7].convert2d().x+1, (cHeight - newPoints[7].convert2d().y/2));
    ctx.lineTo(newPoints[8].convert2d().x+1, (cHeight - newPoints[8].convert2d().y/2));
    ctx.lineTo(newPoints[5].convert2d().x+1, (cHeight - newPoints[5].convert2d().y/2));

    ctx.moveTo(newPoints[6].convert2d().x+1, (cHeight - newPoints[6].convert2d().y/2));
    ctx.lineTo(newPoints[2].convert2d().x+1, (cHeight - newPoints[2].convert2d().y/2));

    ctx.moveTo(newPoints[7].convert2d().x+1, (cHeight - newPoints[7].convert2d().y/2));
    ctx.lineTo(newPoints[3].convert2d().x+1, (cHeight - newPoints[3].convert2d().y/2));

    ctx.moveTo(newPoints[8].convert2d().x+1, (cHeight - newPoints[8].convert2d().y/2));
    ctx.lineTo(newPoints[4].convert2d().x+1, (cHeight - newPoints[4].convert2d().y/2));

    ctx.moveTo(newPoints[9].convert2d().x+1, (cHeight - newPoints[9].convert2d().y/2));
    ctx.lineTo(newPoints[10].convert2d().x+1, (cHeight - newPoints[10].convert2d().y/2));
    ctx.lineTo(newPoints[11].convert2d().x+1, (cHeight - newPoints[11].convert2d().y/2));
    ctx.lineTo(newPoints[12].convert2d().x+1, (cHeight - newPoints[12].convert2d().y/2));

    ctx.moveTo(newPoints[11].convert2d().x+1, (cHeight - newPoints[11].convert2d().y/2));
    ctx.lineTo(newPoints[13].convert2d().x+1, (cHeight - newPoints[13].convert2d().y/2));

    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("V-1.3BETA", 2*scale, 5*scale);
}
//y = x / 2
// 300 x 300
//300 x 150

function setup() {
    points = [];
    points[0] = new Point3D(100*scale, 100*scale, 100*scale);
    points[1] = new Point3D(200*scale, 100*scale, 100*scale);
    points[2] = new Point3D(200*scale, 200*scale, 100*scale);
    points[3] = new Point3D(100*scale, 200*scale, 100*scale);

    points[4] = new Point3D(100*scale, 100*scale, 200*scale);
    points[5] = new Point3D(200*scale, 100*scale, 200*scale);
    points[6] = new Point3D(200*scale, 200*scale, 200*scale);
    points[7] = new Point3D(100*scale, 200*scale, 200*scale);

    points[8] = new Point3D(150*scale, 150*scale, 130*scale);
    points[9] = new Point3D(150*scale, 150*scale, 150*scale);
    points[10] = new Point3D(150*scale, 150*scale, 170*scale);
    points[11] = new Point3D(140*scale, 150*scale, 160*scale);
    points[12] = new Point3D(160*scale, 150*scale, 160*scale);
    points[13] = new Point3D(150*scale, 160*scale, 160*scale);

    setInterval(draw, 10);
}



window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width *= scale;
    canvas.height *= scale;
    cWidth = canvas.width;
    cHeight = canvas.height;
    setup();
    canvas.onmousedown = function (e) {
        down = true;
        sens = document.getElementById("sens").value;
    }

    canvas.onmouseup = function (e) {
        down = false;
        mousePrev = [];
    }

    canvas.onmousemove = function (e) {
        if(!down) { return;}
        var x = e.clientX - canvas.offsetLeft; //x position within the element.
        var y = e.clientY - canvas.offsetTop; //y position within the element.
        if(mousePrev.length == 0) {
            mousePrev[0] = x;
            mousePrev[1] = y;
            return;
        }
        dY = x - mousePrev[0];
        dX = y - mousePrev[1];
        dZ = Math.sqrt(x*x + y*y);
        thetaX += dX / 10000 * sens;
        thetaY += dY / 10000 * sens;
        //thetaZ += dZ / 100000;
    }
}