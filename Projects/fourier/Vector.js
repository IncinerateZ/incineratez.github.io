const HAT_ANGLE = Math.PI * 45 / 180;
const HAT_LENGTH = 50;

class Vector {
    constructor(x, y, mag, deg, rads) {
        this.x = x;
        this.y = y;
        this.mag = mag;
        this.deg = deg % 360;
        this.theta = (this.deg/180) * Math.PI;
        this.rads = rads;
    }

    updateAngle(deltaT) {
        this.deg += deltaT;
        this.theta = (this.deg / 180) * Math.PI;
    }

    draw(ctx, DRAW_SCALE) {
        ctx.strokeStyle = "white"
        ctx.fillStyle = "white"
        this.ax = this.x + (this.mag * Math.cos(this.theta))
        this.ay = this.y + (this.mag * Math.sin(this.theta))
        ctx.beginPath();
        //draw main line
        ctx.moveTo(DRAW_SCALE * this.x, DRAW_SCALE * this.y);
        ctx.lineTo(DRAW_SCALE * (this.ax), DRAW_SCALE * (this.ay));
        ctx.stroke();
        //draw hat    
        ctx.beginPath();
        ctx.moveTo(DRAW_SCALE * (this.x + ((this.mag - 20) * Math.cos(this.theta - this.toRad(3)))), DRAW_SCALE * (this.y + ((this.mag - 20) * Math.sin(this.theta - this.toRad(3)))));
        ctx.lineTo(DRAW_SCALE * (this.ax), DRAW_SCALE * (this.ay));
        ctx.lineTo(DRAW_SCALE * (this.x + ((this.mag - 20) * Math.cos(this.theta + this.toRad(3)))), DRAW_SCALE * (this.y + ((this.mag - 20) * Math.sin(this.theta + this.toRad(3)))));
        //ctx.lineTo(DRAW_SCALE * (this.ax), DRAW_SCALE * (this.ay));

        ctx.fill();
    }

    toRad(deg) {
        return Math.PI * deg / 180;
    }
}