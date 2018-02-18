'use strict';

//build an audio constructor?
//needs global variables that will affect variables inside functions
//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
chan1.volume = 0;
chan2.volume = 0;

chan1.play();

chan1.onplay = function() {
  var fade = setInterval(function () {
    if(chan1.currentTime < 10 && chan1.volume !== 1) {
      chan1.volume += 0.001;
      console.log(chan1.volume);
      if(chan1.volume > 0.96) chan1.volume = 1;
    }
    if(chan1.volume === 1 || chan1.paused === true) clearInterval(fade);
  }, 5);
};
var fadeOut = setInterval(function () {
  if(chan1.currentTime > chan1.duration-10 && !chan1.ended) {
    chan2.play();
    chan1.volume -= 0.003;
    chan2.volume += 0.003;
    console.log(chan2.volume);
    if(chan1.volume < 0.02) chan1.volume = 0;
    if(chan2.volume > 0.96) chan2.volume = 1;
  }
  if(chan1.volume === 0 || chan2.volume === 1) clearInterval(fadeOut);
}, 25);
chan1.ontimeupdate = fadeOut;

document.body.onkeyup = function(event){
  if(event.keyCode === 32 && !chan1.paused) chan1.pause();
  else if (event.keyCode === 32 && chan1.paused) chan1.play();
};
