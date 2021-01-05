const DRAW_SCALE = 0.5;

var canvas;
var ctx;
var v1;

var pts = []

const vlist = `
1000,700,50,0,0.45;
500,45,-0.4;
40,90,0.9;
50,100,-0.72;
65,45,1.02;
10,110,-1.2;
20,0,1.44
`

window.onload = () => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 700;

    /* 2000x1400*/

    vectors = []
    let vl = vlist.split(";");
    for (let i = 0; i < vl.length; i++) {
        let v = vl[i].split(',');
        for (let i = 0; i < v.length; i++) {
            v[i] = parseFloat(v[i])
        }
        console.log(v)
        if (i === 0) {
            vectors.push(new Vector(v[0], v[1], v[2], v[3], v[4]));
        } else {
            vectors.push(new Vector(vectors[i - 1].ax, vectors[i - 1].ay, v[0], v[1], v[2]));
        }
    }

    setInterval(() => {
        canvas.width = canvas.width;
        for (let i = 0; i < vectors.length; i++) {
            //console.log(vectors[i].deg);
            let lx, ly;
            if (i === 0) {
                lx = vectors[0].x;
                ly = vectors[0].y;
            } else {
                lx = vectors[i - 1].ax;
                ly = vectors[i - 1].ay;
            }
            vectors[i].x = lx;
            vectors[i].y = ly;
            vectors[i].updateAngle(vectors[i].rads);
            vectors[i].draw(ctx, DRAW_SCALE);
            if (i === vectors.length - 1) {
                ctx.fillStyle = 'white'
                ctx.beginPath();
                ctx.arc(DRAW_SCALE * vectors[i].ax, DRAW_SCALE * vectors[i].ay, 2, 0, 2 * Math.PI);
                ctx.fill();
                pts.push([vectors[i].ax, vectors[i].ay])
                if (pts.length >= 1000) pts.shift();
            }
        }
        for (let pt of pts) {
            ctx.fillStyle = 'white'
            ctx.beginPath();
            ctx.arc(DRAW_SCALE * pt[0], DRAW_SCALE * pt[1], 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, 10)
}

