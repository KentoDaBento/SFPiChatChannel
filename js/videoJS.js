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
function playAll() {
    for(var t = 0; t <= 5; t++) {
        document.getElementsByTagName('video')[t].play();
    }
}
var mainView = document.getElementsByClassName('mainView');
//Checks if videos are in sideView, then switches between the previous or next video using the arrow keys
document.addEventListener('keydown', function(event) {
    var elem = document.getElementById('container');
    var pix = '0px';
    var videoElem = document.getElementsByTagName('video');
    if(mainView[0].hasChildNodes() === true) {
        var child = parseInt(mainView[0].firstChild.id.substring(1));
        if (event.keyCode === 37 && child !== 1) {
            $("#s" + (child - 1)).after($("#s" + child));
            setTimeout(function() {
                $('.mainView').append($("#s" + (child - 1)));
            }, 0.1);
        }
        else if (event.keyCode === 39 && child !== 6) {
            $("#s" + (child + 1)).before($("#s" + child));
            setTimeout(function() {
                $('.mainView').append($("#s" + (child + 1)));
            }, 0.5);
        }
        playAll();
    }
    if(event.keyCode === 70) {
        if(elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if(elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        else if(elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if(elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
    if(event.keyCode === 69) {
        if(videoElem[0].style.borderRadius === '15px') {
            pix = '0px';
        }
        else {
            pix = '15px';
        }
        for(var i = 0; i < 6; i++) {
            videoElem[i].style.borderRadius = pix;
        }
    }
}, true);
//test JS
function check() {
    for(var i = 0; i < 6; i++) {
        createListeners('VIDEO', i);
        createListeners('IMG', i);
    }
}
function createListeners(tagname, times) {
    var test = document.getElementsByClassName('mainCont')[0];
    test.getElementsByTagName(tagname)[times].addEventListener('click', function(e) {
        var target = e.target.parentNode;
        if(tagname === 'VIDEO') {
            clickFocus(target.id);
        }
        else if(tagname === 'IMG') {
            target = target.parentNode;
            muteUnmute(target.id);
        }
    }, false);
}
// click video player to enlarge the size of the player
function clickFocus(element) {
    var textNum = parseInt(element.substring(1));
    var elementes = document.getElementById(element);
    if(elementes.parentNode === document.getElementsByClassName('mainView')[0]) {
       for(var k = 1; k <= 6; k++) {
           $('.firstView').append($("#s" + k));
        }
    }
    else {
        for(var i = 1; i <= 6; i++) {
            if(i === textNum) {
                $('.mainView').append($("#s" + i));
            }
            else {
                $('.sideView').append($("#s" + i));
            }
        }
    }
    playAll();
}
//mute/unmute button
function muteUnmute(element) {
    var vid = document.getElementById(element);
    var vidElem = vid.getElementsByTagName('video')[0];
    var muteElem = vid.getElementsByTagName('img')[0];
    if(vidElem.muted === true) {
        vidElem.muted = false;
        muteElem.src = 'img/VolumeUp.png';
    } 
    else {
        vidElem.muted = true;
        muteElem.src = 'img/Mute.png';
    }
}