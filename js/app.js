'use strict';

//build an audio constructor?
//needs global variables that will affect variables inside functions
//needs local storage (For volume and selection)

var audio = document.getElementById('channelA');
audio.volume = 0;

function audioFade() {
  audio.play();
  var fade = setInterval(function () {
    if(audio.currentTime < 10) {
      audio.volume += 0.02;
      console.log(audio.volume);
      if(audio.volume > 0.96) audio.volume = 1;
    }
    if(audio.volume === 1) clearInterval(fade);
  }, 200);
}
audioFade();