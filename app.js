var toggle = false;
function click(e){
    var dragbox = document.getElementById("drag-box");
    var destbox = document.getElementById("dest-box");
    boxX = parseInt(dragbox.style.left.split("px")[0]);
    boxY = parseInt(dragbox.style.top.split("px")[0]) + 50;
    dX = parseInt(destbox.style.left.split("px")[0]);
    dY = parseInt(destbox.style.top.split("px")[0]) + 50;
    if(e.pageX >= boxX && e.pageX <= boxX + 100 && e.pageY >= boxY && e.pageY <= (boxY + 31.5)){
        toggle = !toggle;
        dragbox.style.height = "31.5px";
        dragbox.style.border = "2px solid black";
        dragbox.style.background = "white";
        dragbox.style.color = "black";
    }
    if(e.pageX >= dX && e.pageX <= dX + 100 && e.pageY >= dY && e.pageY <= (dY + 31.5)){
        dragbox.style.top = dY - 50.5 + "px";
        dragbox.style.left = dX + "px";
        dragbox.style.height = "33px";
        dragbox.style.border = 0 + "px";
        dragbox.style.background = "rgb(64, 42, 95)";
        dragbox.style.color = "rgb(64, 42, 95)";
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