const IMGBANK = "https://api.unsplash.com/photos/random?count=8";
var IMG_MAX = 12;

const NOIMG = 'https://media.discordapp.net/attachments/692262929252352055/735073072444342272/unknown.png';


var lastDownTarget;
var lastCard;
var count = 0;

var content;
var popupcont;
var imgwidth;
var imgheight;

var pastres;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

function createImg(i) {
    content.innerHTML += "<div class='img-shadow' id='img-shadow-" + (i) + "'></div>";
    const shadow = document.getElementById("img-shadow-" + (i));
    shadow.style.width = imgwidth + "px";
    shadow.style.height = imgheight + "px";

    shadow.innerHTML += '<img id="preset-' + (i) +'" src="' + NOIMG + '">';
    shadow.innerHTML += '<img id="' + (i) + '"></img>';
    //shadow.innerHTML += NOIMG;

    //popup card
    popupcont.innerHTML += "<div class='popup' id='popup-" + i + "'><div class='popup-content'></div>"
    popupcont.style.marginLeft = "-10000px";

    const temp = document.getElementById("popup-" + i);
    temp.firstChild.innerHTML = "No Image Found (" + i + "). <br> If Images Do Not Load, API Has Maxed Out.";
}

function fillCard(res) {
    res.forEach(pic => {
        const img = document.getElementById(count);
        const card = document.getElementById("popup-" + count);
        const preset = document.getElementById("preset-" + count);

        preset.parentNode.removeChild(preset);
        card.firstChild.innerHTML = "Photo by <a href='" + pic["user"]["links"]["html"] +"'>" + pic["user"]["name"] + "</a> on <a href='https://unsplash.com/?utm_source=Personal_App&utm_medium=referral'>Unsplash</a>";
        img.src = pic["urls"]["thumb"];

        count++;
    });
}

window.onload = function() {
    const pagebg = document.getElementById("page-bg");
    popupcont = document.getElementById("popup-container");
    pagebg.style.height = window.innerHeight + "px";
    console.log(pagebg.style.height, window.innerHeight);

    content = document.getElementById("content");
    imgwidth = (content.clientWidth - 4*25)/4;
    imgheight = imgwidth/1.7777777778;

    for(let i = 0; i < IMG_MAX; i++) {
        createImg(i);
    }

    const getImages = async () => {
        var res;
        do {
            const response = await fetch(IMGBANK + Math.ceil((count + 1)/8), {
                headers: {
                    'Accept-Version' : 'v1',
                    'Authorization' : 'Client-ID nANLvJnLlK9S6wo_2WI5RJ0BU5ux6smSjBsVZT8z6sY'
                }
            });
            res = await response.json();
        } while (res === pastres);
        pastres = res;

        fillCard(res);

        if(count < IMG_MAX) {
            setTimeout(() => {
                getImages()
            }, 1000);
        }
    }
    getImages();

    document.addEventListener('mousedown', function(event) {
        if(!(event.which === 1)) return;
        lastDownTarget = event.target;
        if(!isNaN(lastDownTarget.id)) {
            if(lastDownTarget.id === "") return;
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

window.onscroll = function(ev) {
    const pagebg = document.getElementById("page-bg");
    const last = document.getElementById(IMG_MAX-1);
    if(last.src === "") return;
    if ((window.innerHeight + window.pageYOffset) >= parseInt(pagebg.style.height)) {
        pagebg.style.height = (parseInt(pagebg.style.height) + 2*(imgheight + 20)) + "px";
        for(let i = IMG_MAX; i < IMG_MAX + 8; i++) {
            createImg(i);
        }
        const getImages = async () => {
            var res;
            do {
                const response = await fetch(IMGBANK + Math.ceil((count + 1)/8), {
                    headers: {
                        'Accept-Version' : 'v1',
                        'Authorization' : 'Client-ID nANLvJnLlK9S6wo_2WI5RJ0BU5ux6smSjBsVZT8z6sY'
                    }
                });
                res = await response.json();
            } while (res === pastres);
            pastres = res;
            
            fillCard(res);
    
            if(count < IMG_MAX + 8) {
                setTimeout(() => {
                    getImages()
                }, 5000);
            }
        }
        getImages();
        IMG_MAX += 8;
    }
};

window.addEventListener('wheel', function(event)
{
    if (event.deltaY > 0) {
        const pagebg = document.getElementById("page-bg");
        const last = document.getElementById(IMG_MAX-1);
        if(last.src === "") return;
        if ((window.innerHeight + window.pageYOffset) >= parseInt(pagebg.style.height)) {
            pagebg.style.height = (parseInt(pagebg.style.height) + 2*(imgheight + 20)) + "px";
            for(let i = IMG_MAX; i < IMG_MAX + 8; i++) {
                createImg(i);
            }
            const getImages = async () => {
                var res;
                do {
                    const response = await fetch(IMGBANK + Math.ceil((count + 1)/8), {
                        headers: {
                            'Accept-Version' : 'v1',
                            'Authorization' : 'Client-ID nANLvJnLlK9S6wo_2WI5RJ0BU5ux6smSjBsVZT8z6sY'
                        }
                     });
                    res = await response.json();
                } while (res === pastres);
                pastres = res;
            
                fillCard(res);
    
                if(count < IMG_MAX + 8) {
                    setTimeout(() => {
                        getImages()
                    }, 5000);
                }
            }
            getImages();
            IMG_MAX += 8;
        }
    }
});