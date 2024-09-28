var displaytime = 5; //  aka display time in sec
var transitontime = 1; // match with transition from css
var numberofimieninki = 3;
const args = ['$time','$date','$imieniny']; //args can be used as motd line



const container = document.getElementById("container");
const containerstyle = document.styleSheets[0].cssRules[1].style;
var timeinterval;
var roop;
var MOTD;
var rawMOTD;
var imieninkiavx;
var slideshowcount = 0;

function start() {
    //prepare motd
    rawMOTD = getMOTD();
    MOTD = rawMOTD.split("\r\n");
    //fetch nameday to imieninkiavx
    fetchNameday();
    //calc
    transitontime = transitontime * 1000; // trans haha gej time to ms
    displaytime = displaytime * 1000;
    //start interval
    setTimeout(function() {fade();}, displaytime+transitontime); //for start
    if (MOTD.length > 1) {
        loop = runLoop();
    }else   { 
        setTimeout(function() {if(parseargs()==0){changetext();};show();}, displaytime+transitontime+transitontime);
    }
    
}

function stop() {
    clearInterval(loop);
    clearInterval(timeinterval);
}

function runLoop(){
    return setInterval(function() {
        changetext();
        setTimeout(function() {show();console.log('show')}, transitontime);
        setTimeout(function() {fade();console.log('fade')}, displaytime+transitontime);
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
    container.innerHTML = MOTD[slideshowcount];
    parseargs()
    slideshowcount++;
}
//ultra nie optymalne
function parseargs() {
    
    clearInterval(timeinterval);
    for (let j = 0; j < args.length; j++) {
        if (MOTD[slideshowcount] == args[j]) {
            switch(j){
                case 0:
                    container.innerHTML = getTimeFormated();
                    timeinterval = setInterval(function() {container.innerHTML = getTimeFormated();},1000);
                    return 1;
                break;
                case 1:
                    container.innerHTML = getDateFormated();
                    timeinterval = setInterval(function() {container.innerHTML = getDateFormated();},1000);
                    return 1;
                break;
                case 2:
                    //prepare imieninki
                    let imieninki = new Array();
                    for (i = 0; i < imieninkiavx.length - (1 + (imieninkiavx.length - numberofimieninki));i++){
                        imieninki[i] = imieninkiavx[i];
                    }
                    container.innerHTML = imieninki.join(", ")+" i "+imieninkiavx[imieninkiavx.length-1];
                    return 1;
                break;
            }
        }
    }
    return 0;
}

//TODO  zmienić to na fetch
function getMOTD() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "MOTD.txt", false);
    xhr.send();
    return xhr.responseText;
}

function getDateFormated(){
    var date = new Date();
    return date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+('0'+date.getUTCDate()).substr(-2);
}

function getTimeFormated(){
    var date = new Date();
    return ('0'+date.getHours()).substr(-2)+':'+('0'+date.getMinutes()).substr(-2)+':'+('0'+date.getSeconds()).substr(-2)
}

function setImininki(imieninki){
    imieninki.json().then((value) => {imieninkiavx = value.nameday.pl});

}

function fetchNameday() {
    const url = new URL(
        "https://nameday.abalin.net/api/V1/today"
    );
    
    const params = {
        "country": "pl",
        "timezone": "Europe/Warsaw",
    };
    
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    fetch(url, {
        method: "POST",
        headers}).then((response)=>{response.json().then((value) => {imieninkiavx = value.nameday.pl;imieninkiavx = imieninkiavx.split(", ")})});
}

start();