function PlaySound(soundobj) {
    var sound=document.getElementById(soundobj);
    sound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    sound.pause();
    sound.currentTime = 0;
}