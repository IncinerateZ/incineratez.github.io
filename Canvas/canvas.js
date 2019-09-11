window.addEventListener('load' , () => {
    //Variables and Constants
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    var clicking = false;
    var drawn = [];
    var pathFound = false;
    var grid = new Array(60).fill(null).map(()=>new Array(28).fill(null));

    //Functions
    function draw(e){
        let x = e.clientX - 1.5;
        let y = e.clientY - 1.5;
        let boxX, boxY;
        boxX = Math.floor(x/25);
        boxY = Math.floor(y/25);
        if(drawn.includes(boxX+":"+boxY) || canvas.width - boxX*25 + 1.5 < 27 || canvas.height - boxY*25 + 1.5 < 27 || boxX < 0 || boxY < 2){
            return;
        }
        context.fillRect(boxX*25 + 1.5, boxY*25 + 1.5, 25, 25);
        drawn.push(boxX+":"+boxY);
        console.log(boxX + ":" + boxY);
    }

    function getNeighbors(tiles){
        let neighbors = [];

        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                if((x == 0 && y == 0) || (x == -1 && y == 1) || (x == 1 && y == 1) || (x == -1 && y == -1) || (x == 1 && y == -1)){
                    continue;
                }

                let checkX = tiles.boxX + x;
                let checkY = tiles.boxY + y;
                if(checkX >= 0 && checkX < 60 && checkY >= 2 && checkY < 28){
                    neighbors.push(grid[checkY][checkX]);
                }
            }
        }
        return neighbors;
    }

    function getDistance(a, b){
        return 10 * (Math.abs(b.boxX - a.boxX) + Math.abs(b.boxY - a.boxY));
    }

    //Resizing
    canvas.height = (window.innerHeight-5);
    canvas.width = Math.floor(window.innerWidth/25)*25;

    //Initializing Board
    for(let y = 50.5; y <= canvas.height - 24; y += 25) {
        for (let i = 1.5; i <= canvas.width - 24; i += 25) {
            grid[Math.floor(y/25)][Math.floor(i/25)] = new tile(Math.floor(i/25), Math.floor(y/25), null);
            context.strokeRect(i, y, 25, 25);
        }
    }

    context.fillStyle = "green";
    context.fillRect(1.5,50.5,25,25);
    context.fillStyle = "red";
    context.fillRect(canvas.width - 48,canvas.height - 41,25,25);
    context.fillStyle = "yellow";

    //Event Listeners
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

    //Temp
    var count = 0;
    var open = [];
    var closed = [];
    var startNode = new tile(0, 2, null);
    var endNode = new tile(59, 27, null);
    grid[2][0] = startNode;
    grid[27][59] = endNode;
    open.push(startNode);
    //Logic
    while((!pathFound) && open.length > 0){
        var current;
        current = open[0];
        console.log(current.boxX + " : " + current.boxY);
        context.fillRect(current.boxX*25 + 1.5, current.boxY*25 + 1.5, 25, 25);

        for(let i = 1; i < open.length; i++){
            if(open[i].tcost < current.tcost || open[i].tcost == current.tcost && open[i].ocost < current.ocost){
                current = open[i];
            }
        }

        for(let i = 0; i < open.length; i ++){
            if(open[i] == current){
                open.splice(i,i+1);
                break;
            }
        }
        closed.push(current);
        if(current.boxX = 59 && current.boxY == 27){
            context.fillStyle = "blue";
            console.log("PATH FOUND!");
            pathFound = true;
            return;
        }
        for(neighbor of getNeighbors(current)){
            if(neighbor == undefined){ continue;}
            let newMovementCostToNeighbor = current.ocost + getDistance(current, neighbor);
            if(newMovementCostToNeighbor < neighbor.ocost || !open.includes(neighbor)){
                neighbor.ocost = newMovementCostToNeighbor;
                neighbor.ecost = getDistance(neighbor, endNode);
                neighbor.root = current;

                if(!open.includes(neighbor)){
                    open.push(neighbor);
                }
            }
        }

        count += 1;
        if(count == 5000){
            console.log(count);
            console.log(open);
            pathFound = true;
            break;
        }
    }
});

//Classes
class tile{

    constructor(boxX, boxY, root) {
        let tcost;
        this.boxX = boxX;
        this.boxY = boxY;
        this.ocost = null;
        this.ecost = null;
        this.root = root;
    }

    get tcost() {
        return this.calctcost();
    }

    calctcost(){
        return this.ecost + this.ocost;
    }
    
}
