const IMGBANK = "https://api.unsplash.com/photos/random?orientation=landscape&count=4";
var count = 0;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

window.onload = function() {
    const content = document.getElementById("content");
    const imgwidth = (content.clientWidth - 4*20)/4;
    const imgheight = imgwidth/1.7777777778;

    const getImage  = async (i) => {
        const response = await fetch(IMGBANK, {
            headers: {
                'Accept-Version' : 'v1',
                'Authorization' : 'Client-ID nANLvJnLlK9S6wo_2WI5RJ0BU5ux6smSjBsVZT8z6sY'
            }
        });
        const res = await response.json();

        console.log(res);

        const content = document.getElementById("content");
        content.innerHTML += "<div class='img-shadow' id='img-shadow-" + i + "'><img id=" + i + "></div>";

        const shadow = document.getElementById("img-shadow-" + i);
        shadow.style.width = imgwidth + "px";
        shadow.style.height = imgheight + "px";

        const img = document.getElementById(i);
        img.src = res["urls"]["thumb"];
    }

    const getImages = async () => {
        const response = await fetch(IMGBANK, {
            headers: {
                'Accept-Version' : 'v1',
                'Authorization' : 'Client-ID nANLvJnLlK9S6wo_2WI5RJ0BU5ux6smSjBsVZT8z6sY'
            }
        });
        const res = await response.json();

        console.log(res);
        const content = document.getElementById("content");
        res.forEach(pic => {
            content.innerHTML += "<div class='img-shadow' id='img-shadow-" + count + "'><img id=" + count + "></div>";
            const shadow = document.getElementById("img-shadow-" + count);
            shadow.style.width = imgwidth + "px";
            shadow.style.height = imgheight + "px";

            const img = document.getElementById(count);
            img.src = pic["urls"]["thumb"];

            count++;
        });
        if(count < 12) {
            setTimeout(() => {
                getImages()
            }, 1000);
        }
    }
    getImages();
    /*for(let i = 0; i < 4; i++) {
        getImage(i);
    }*/
}