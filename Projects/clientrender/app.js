const IMGBANK = "https://api.unsplash.com/photos/random?orientation=landscape&count=4";
const IMG_MAX = 12;

const NOIMG = '<svg id="noimg" width="312" height="245" viewBox="0 0 312 245" fill="none" xmlns="http://www.w3.org/2000/svg">' +
'<rect x="1" y="1" width="310" height="243" rx="19" stroke="black" stroke-width="2" stroke-miterlimit="2.32452" stroke-linecap="round" stroke-linejoin="round"/>' +
'<circle cx="194.5" cy="49.5" r="20.5" stroke="black" stroke-width="2"/>' +
'<path d="M114.76 61.6299L114.924 61.7121C116.604 62.5519 117.998 63.8694 118.931 65.499L178.5 169.5L206.664 117.945C207.539 116.344 208.825 115.005 210.389 114.067C213.549 112.171 217.483 112.116 220.695 113.922L220.862 114.016C222.586 114.986 224.004 116.419 224.955 118.154L276.232 211.688C277.064 213.205 277.5 214.907 277.5 216.637V217.337C277.5 220.808 275.539 223.98 272.435 225.533C271.162 226.169 269.759 226.5 268.337 226.5H24.5L22.3724 224.863C19.6155 222.743 18 219.462 18 215.984C18 214.029 18.5116 212.108 19.484 210.412L102.697 65.2728C103.549 63.7873 104.799 62.5698 106.307 61.7579C108.936 60.3423 112.089 60.2946 114.76 61.6299Z" stroke="black" stroke-width="2"/>' +
'</svg>';


var lastDownTarget;
var lastCard;
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
    const popupcont = document.getElementById("popup-container");
    const imgwidth = (content.clientWidth - 4*20)/4;
    const imgheight = imgwidth/1.7777777778;

    for(let i = 0; i < IMG_MAX; i++) {
        content.innerHTML += "<div class='img-shadow' id='img-shadow-" + (i) + "'></div>";
        const shadow = document.getElementById("img-shadow-" + (i));
        shadow.style.width = imgwidth + "px";
        shadow.style.height = imgheight + "px";

        shadow.innerHTML += '<img id="' + (i) + '"></img>';
        //shadow.innerHTML += NOIMG;

        //popup card
        popupcont.innerHTML += "<div class='popup' id='popup-" + i + "'><div class='popup-content'></div>"
        popupcont.style.marginLeft = "-10000px";

        const temp = document.getElementById("popup-" + i);
        temp.firstChild.innerHTML = "No Image Found (" + i + ").";
    }

    // DEPRECATED
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
    //^^DEPRECATED^^


    const getImages = async () => {
        const response = await fetch(IMGBANK, {
            headers: {
                'Accept-Version' : 'v1',
                'Authorization' : 'Client-ID nANLvJnLlK9S6wo_2WI5RJ0BU5ux6smSjBsVZT8z6sY'
            }
        });
        const res = await response.json();

        console.log(res);
        res.forEach(pic => {
            const img = document.getElementById(count);
            const card = document.getElementById("popup-" + count);
            card.firstChild.innerHTML = "Photo by <a href='" + pic["user"]["links"]["html"] +"'>" + pic["user"]["name"] + "</a> on <a href='https://unsplash.com/?utm_source=Personal_App&utm_medium=referral'>Unsplash</a>";
            img.src = pic["urls"]["thumb"];

            count++;
        });
        if(count < IMG_MAX) {
            setTimeout(() => {
                getImages()
            }, 1000);
        }
    }
    getImages();

    document.addEventListener('mousedown', function(event) {
        lastDownTarget = event.target;
        if(!isNaN(lastDownTarget.id)) {
            popupcont.style.marginLeft = "0px";
            const card = document.getElementById("popup-" + lastDownTarget.id);
            card.style.zIndex = 10000;
            lastCard = lastDownTarget.id;
        } else if(lastDownTarget.id === "popup-container") {
            popupcont.style.marginLeft = "-10000px";
            const card = document.getElementById("popup-" + lastCard);
            card.style.zIndex = 0;
        }
    }, false);
}