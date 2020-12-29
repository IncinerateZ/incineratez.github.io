var canvas;
var ctx;

var boundaries = [];
var r;

const line = (x1, y1, x2, y2, color) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = "black";
}

const point = (x, y, point) => {
    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    if (!point)
        ctx.stroke();
    else ctx.fill();
}

class Boundary {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    show() {
        line(this.x1, this.y1, this.x2, this.y2, "white");
    }
}

class Ray {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    show() {
        line(this.x, this.y, this.dx, this.dy, "white");
    }

    cast() {
        let hit = {d: 100000};
        let x1 = this.x;
        let y1 = this.y;
        let x2 = this.dx;
        let y2 = this.dy;
        for (let b of boundaries) {
            let x3 = b.x1;
            let y3 = b.y1;
            let x4 = b.x2;         
            let y4 = b.y2;
            const den = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
            if (den == 0) continue;
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            let u = -(((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3))) / den;
            if (t > 0 && t < 1 && u > 0 && u < 1) {
                let px = (x1 + t * (x2 - x1));
                let py = (y1 + t * (y2 - y1))
                let res = {
                    x: px,
                    y: py,
                    d: Math.sqrt(Math.pow(x1 - px, 2) + Math.pow(y1 - py, 2))
                };
                if(res.d < hit.d)
                    hit = res;
            }
        }
        return hit;
    }

}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.show();
        this.build();
    }

    build() {
        for (let a = 0; a < 360; a += 2) {
            let t = new Ray(this.x, this.y, a < 180 ? 500 : -500, 500 * Math.tan(Math.PI * a / 180));
            //t.show();
            let h = t.cast();
            if (h) {
                point(h.x, h.y, true);
                line(this.x, this.y, h.x, h.y, "lightgray");
            }
        }
    }

    show() {
        point(this.x, this.y, false);
    }
}

window.onload = () => {
    canvas = document.querySelector('#canvas');
    canvas.width = 500;
    canvas.height = 500;

    ctx = canvas.getContext('2d');

    for (let i = 0; i < 15; i++) {
        boundaries.push(new Boundary(Math.random() * 500, Math.random() * 500, Math.random() * 500, Math.random() * 500));
        boundaries[i].show();
    }

    canvas.onmousemove = (e) => {
        canvas.width = canvas.width;
        let rect = canvas.getBoundingClientRect();
        r = new Point(e.clientX - rect.left, e.clientY - rect.top);
        for (let b of boundaries) b.show();
    }
}