var toggle = false;
function click(e){
    var dragbox = document.getElementById("drag-box");
    boxX = parseInt(dragbox.style.left.split("px")[0]);
    boxY = parseInt(dragbox.style.top.split("px")[0]);
    if(e.pageX >= boxX && e.pageX <= boxX + 100 && e.pageY >= boxY && e.pageY <= boxY + 80){
        toggle = !toggle;
        console.log("TRUE");    
    } else {
        console.log(e.pageX + ":" + boxX);
        console.log(e.pageY + ":" + boxY);
    }
}

function move(e){
    console.log(toggle);
    var dragbox = document.getElementById("drag-box");
    if(toggle){
        dragbox.style.top = e.pageY - 62 + "px";
        dragbox.style.left = e.pageX - 47 + "px";
    }
}

document.addEventListener('DOMContentLoaded', addListen, false);
function addListen(){
    document.addEventListener('mousedown', click);
    document.addEventListener('mousemove', move);
}