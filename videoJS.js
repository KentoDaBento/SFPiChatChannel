//timezone display
function showTheTime() {
    var s = moment().tz("America/Los_Angeles").format('hh:mm a');
    var b = moment().tz("America/Bogota").format('hh:mm a');
    var u = moment().tz("America/Montevideo").format('hh:mm a');
    var i = moment().tz("America/Indiana/Indianapolis").format('hh:mm a');
    document.getElementById("timeWWWF").innerHTML = s;
    document.getElementById("timeWWWB").innerHTML = s;
    document.getElementById("timeBogota").innerHTML = b;
    document.getElementById("timeMontevideo").innerHTML = u;
    document.getElementById("timeIndy").innerHTML = i;
}
var mainView = document.getElementsByClassName('mainView');
var videoElem = document.getElementsByTagName('video');
var pix = '0px';
//Checks if videos are in sideView, then switches between the previous or next video using the arrow keys
document.addEventListener('keydown', function(event) {
    if(mainView[0].hasChildNodes() === true){
        var child = parseInt(mainView[0].firstChild.id.substring(1));
        if (event.keyCode === 37 && child != 1) {
            $("#s" + (child - 1)).after($("#s" + child));
            setTimeout(function(){
                $('.mainView').append($("#s" + (child - 1)));
            }, 0.1);
        }
        else if (event.keyCode === 39 && child != 6) {
            $("#s" + (child + 1)).before($("#s" + child));
            setTimeout(function(){
                $('.mainView').append($("#s" + (child + 1)));
            }, 0.5);
        }
        setTimeout(function(){
            for(var i = 1; i <= 6; i++){
                document.getElementById('v' + i).play();
            }
        }, 0.1);
    }
    if(event.keyCode === 70){
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
    if(event.keyCode === 69){
        if(videoElem[0].style.borderRadius === '15px'){
            pix = '0px';
        }
        else{
            pix = '15px';
        }
        for(var i = 0; i < 6; i++){
            videoElem[i].style.borderRadius = pix;
        }
    }
}, true);
// click video player to enlarge the size of the playerd
function clickFocus(element){
    var textNum = parseInt(element.substring(1));
    var elementes = document.getElementById(element);
    if(elementes.parentNode === mainView[0]){
       for(var i = 1; i <= 6; i++){
           $('.firstView').append($("#s" + i));
        }
    }
    else{
        for(var i = 1; i <= 6; i++){
            if(i === textNum){
                $('.mainView').append($("#s" + i));
            }
            else{
                $('.sideView').append($("#s" + i));
            }
        }
    }
    setTimeout(function(){
        for(var i = 1; i <= 6; i++){
           document.getElementById('v' + i).play();
        }
    }, 0);
}
//mute/unmute button
function muteUnmute(element){
    var vidElem = document.getElementById('v' + element);
    var muteElem = document.getElementById('m' + element);
    if(vidElem.muted === true){
        vidElem.muted = false;
        muteElem.src = 'VolumeUp.png'
    }
    else{
        vidElem.muted = true;
        muteElem.src = 'Mute.png'
    }
}