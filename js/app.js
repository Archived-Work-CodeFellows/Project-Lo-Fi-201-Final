'use strict';

//build an audio constructor?
//needs global variables that will affect variables inside functions
//needs local storage (For volume and selection)

var chan1 = document.getElementById('channelA');
chan1.volume = 0;
chan1.play();

chan1.onplay = function() {
  var fade = setInterval(function () {
    if(chan1.currentTime < 10 && chan1.volume !== 1) {
      chan1.volume += 0.001;
      console.log(chan1.volume);
      if(chan1.volume > 0.96) chan1.volume = 1;
    }
    if(chan1.volume === 1) clearInterval(fade);
  }, 5);
};
var fadeOut = setInterval(function () {
  if(chan1.currentTime > chan1.duration-10 && !chan1.ended) {
    chan1.volume -= 0.003;
    console.log(chan1.volume);
    if(chan1.volume < 0.02) chan1.volume = 0;
  }
  if(chan1.volume === 0) clearInterval(fadeOut);
}, 25);
chan1.ontimeupdate = fadeOut;