'use strict';

//build an audio constructor?
//needs global variables that will affect variables inside functions
//needs local storage (For volume and selection)

var chan1 = document.getElementById('channelA');
chan1.volume = 0;

function audioFade() {
  chan1.play();
  var fade = setInterval(function () {
    if(chan1.currentTime < 10) {
      chan1.volume += 0.02;
      console.log(chan1.volume);
      if(chan1.volume > 0.96) chan1.volume = 1;
    }
    if(chan1.volume === 1) clearInterval(fade);
  }, 200);
}
chan1.ontimeupdate = setInterval(function () {
  if(chan1.currentTime >= chan1.duration-10) {
    chan1.volume -= 0.02;
    console.log(chan1.volume);
    if(chan1.volume < 0.02) chan1.volume = 0;
  }
  if(chan1.volume === 0) clearInterval(chan1);
}, 200);

audioFade();