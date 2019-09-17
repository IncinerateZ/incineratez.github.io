window.addEventListener('load' , () => {
    //Variables and Constants
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = 710;
    canvas.width = 1500;
    var points = [[500,100,100],[1000,100,100],[1000,500,100],[500,500,100]]

    //Functions
    function draw(points){
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for(let p of points){
            ctx.lineTo(p[0], p[1]);
        }
        ctx.fill();
    }

    function rotate(){
        let points1 = [];
        let deg = 60;
        let rad = (deg/180) * Math.PI;
        let xp;
        let yp;
        ctx.fillStyle = "white";
        
        for(let p of points){
            xp = cos
            points1.push([xp,yp]);
        }

        ctx.fillStyle = "black";
        console.log(points1);
        return points1;
    }

    draw(points);

    //Event Listeners
    canvas.addEventListener("mousedown", rotate);
}
)