document.addEventListener('contextmenu', event => event.preventDefault());
let ele = '<div id="popup"><div class="pane">The test window should be attempted in fullscreen.<br><br><button class="btn" onClick="javascript:requestFullScreen();">OK</button></div></div>';
$('body').prepend(ele);

function requestFullScreen() {
    var el = document.documentElement;
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (requestMethod) {
        // Native full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }

    document.getElementById('popup').parentNode.removeChild(document.getElementById('popup'));
}

document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);

let xzcf = parseInt(localStorage.getItem('xzcf'));
xzcf = isNaN(xzcf) ? 0 : xzcf;

function onFullScreenChange() {
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    // if in fullscreen mode fullscreenElement won't be null
    if (!fullscreenElement) {
        xzcf++;
        localStorage.setItem('xzcf', xzcf);
        if (xzcf >= 3) {
            let msg = "<did id='popup'><div class='pane'>Submitting quiz...</div></div>";
            setTimeout(function() {
                window.location = base_url + "index.php/quiz/submit_quiz";
                console.log("timeout")
            }, 2000);
            $('body').prepend(msg);
            return;
        }
        let msg = '<div id="popup"><div class="pane">The test window should be attempted in fullscreen. Do not attempt to leave fullscreen while attempting the test.<br>Warnings (Test will auto-submit on 3 warnings): ' + warnings + '<br><br><button class="btn" onClick="javascript:requestFullScreen();">OK</button></div></div>';
        $('body').prepend(msg);
    }

}

document.onkeydown = function(e) {
    disableKeys(e);
}

function disableKeys(e) {
    if (e.target) t = e.target; //Firefox and others
    else if (e.srcElement) t = e.srcElement; //IE
    if (e.keyCode == 116) //prevent F5 for refresh
        e.preventDefault();
    if (e.keyCode == 122) //F11 leave fullscreen
        e.preventDefault()
    else if (e.altKey && e.keyCode == 115) //Alt + F4
        e.preventDefault();
    else if (e.altKey && e.keyCode == 37) //Alt + left
        e.preventDefault();
    else if (e.altKey && e.keyCode == 39) //Alt + right
        e.preventDefault();
    else if (e.ctrlKey && e.keyCode == 82) //Ctrl + R (reload)
        e.preventDefault();
    else if (e.ctrlKey && e.keyCode == 67) //Ctrl + C
        e.preventDefault();
    else if (e.ctrlKey && e.keyCode == 86) //Ctrl + V
        e.preventDefault();
    else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) //Ctrl + shift + I
        e.preventDefault();
    if (!(t.tagName == 'INPUT')) {
        if (e.keyCode == 13) { //enter
            e.preventDefault();
        }
        if (e.keyCode == 8) { //backspace
            e.preventDefault();
        }
    }
}