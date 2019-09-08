window.addEventListener('load' , () => {
    //Variables and Constants
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    var clicking = false;
    var drawn = [];

    //Functions
    function draw(e){
        let x = e.clientX - 1.5;
        let y = e.clientY - 1.5;
        let boxX, boxY;
        boxX = Math.floor(x/25);
        boxY = Math.floor(y/25);
        if(drawn.includes(boxX+":"+boxY) || canvas.width - boxX*25 + 1.5 < 27 || canvas.height - boxY*25 + 1.5 < 27 || boxX < 0 || boxY < 0){
            return;
        }
        context.fillRect(boxX*25 + 1.5, boxY*25 + 1.5, 25, 25);
        drawn.push(boxX+":"+boxY);
    }

    //Resizing
    canvas.height = window.innerHeight - 5;
    canvas.width = window.innerWidth - 20;
    for(let y = 1.5; y <= canvas.height - 24; y += 25) {
        for (let i = 1.5; i <= canvas.width - 24; i += 25) {
            context.strokeRect(i, y, 25, 25);
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        clicking = true;
        draw(e);
    })

    canvas.addEventListener('mouseup', (e) => {
        clicking = false;
    })

    canvas.addEventListener('mousemove', (e) => {
        if(clicking){
            draw(e);
        }
    })
});
