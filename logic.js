var displaytime = 6; //  aka display time in sec
var transitontime = 1; // match with transition from css
const args = ['$time','$sex'];



const container = document.getElementById("container");
const containerstyle = document.styleSheets[0].cssRules[1].style;
var timeinterval;
var MOTD;
var rawMOTD;
var slideshowcount = 0;

function start() {
    //prepare motd
    rawMOTD = getMOTD();
    rawMOTD = rawMOTD.split("\r\n");
    MOTD = rawMOTD;
    //calc
    transitontime = transitontime * 1000; // trans haha gej time to ms
    displaytime = displaytime * 1000;
    //start interval
    setTimeout(function() {fade();}, displaytime+transitontime);
    setInterval(function() {
        changetext();
        setTimeout(function() {show();}, transitontime);
        setTimeout(function() {fade();}, displaytime);
    }, displaytime+transitontime+transitontime);
}

function show() {
    containerstyle.opacity = 1;
}

function fade() {
    containerstyle.opacity = 0;
}

function changetext() {
    if (slideshowcount >= MOTD.length) {
        slideshowcount = 0;}
    //ultra nie optymalne
    clearInterval(timeinterval);
    container.innerHTML = MOTD[slideshowcount];
    for (let j = 0; j < args.length; j++) {
        if (MOTD[slideshowcount] == args[j]) {
            switch(j){
                case 0:
                    timeinterval = setInterval(function() {container.innerHTML = getDateFormated();},1000);
                break;
            }
        }
    }
    slideshowcount++;
}
//TODO  napraw aby local file działało
function getMOTD() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "MOTD.txt", false);
    xhr.send();
    return xhr.responseText;
}

function getDateFormated(){
    var date = new Date();
    return date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+('0'+date.getUTCDate()).substr(-2)+' | '+('0'+date.getHours()).substr(-2)+':'+('0'+date.getMinutes()).substr(-2)+':'+('0'+date.getSeconds()).substr(-2)
}

start();