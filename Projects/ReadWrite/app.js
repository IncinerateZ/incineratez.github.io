document.addEventListener('DOMContentLoaded', load, false);
function load(){
    var form = document.getElementById("text-form");
    var label = document.getElementById("label");
    form.onsubmit = function(e){
        e.preventDefault();
        console.log(form.Text.value);
        label.innerHTML = form.Text.value;

        var blob = new Blob(["This is my first text."], {type: "text/plain;charset=utf-8"});
        var file = new File(["This is my first text."], "./src/dat.txt");


        form.reset();
    };
}