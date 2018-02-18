'use strict';

//build an audio constructor?
//needs global variables that will affect variables inside functions
//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var harmonySelector = document.getElementById('harmony');
var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
var chanSelector = 0;

chan1.volume = 0;
chan2.volume = 0;

harmonySelector.addEventListener('click', audioPlay);

function audioPlay(){
  chan1.play();
  chan1.onplay = function() {
    var fade = setInterval(function () {
      if(chan1.currentTime < 10 && chan1.volume !== 1) {
        chan1.volume += 0.001;
        console.log(chan1.volume);
        if(chan1.volume > 0.96) {
          chan1.volume = 1;
          chanSelector = 0;
        }
      }
      if(chan1.volume === 1 || chan1.paused === true) clearInterval(fade);
    }, 5);
  };
  chan1.ontimeupdate = fadeOut;
  var fadeOut = setInterval(function () {
    if(chan1.currentTime > chan1.duration-10 && !chan1.ended) {
      chan2.play();
      chan1.volume -= 0.003;
      chan2.volume += 0.003;
      console.log(chan2.volume);
      if(chan2.volume > 0.96) {
        chan1.volume = 0;
        chan2.volume = 1;
        chanSelector = 1;
        clearInterval(fadeOut);
      }
    }
    //if(chan1.volume === 0 || chan2.volume === 1) clearInterval(fadeOut);
  }, 25);

  var fadeOut2 = setInterval(function() {
    if(chan2.currentTime > chan2.duration-10 && !chan2.ended) {
      chan1.play();
      chan2.volume -= 0.003;
      //chan1.volume += 0.003;
      console.log(chan1.volume);
      if(chan1.volume > 0.96) {
        chan2.volume = 0;
        chan1.volume = 1;
        chanSelector = 0;
        clearInterval(fadeOut2);
      }
    }
  }, 15);

  chan2.ontimeupdate = fadeOut2;
}
document.body.onkeyup = function(event){
  switch(chanSelector) {
  case 1:
    if(event.keyCode === 32 && !chan2.paused) chan2.pause();
    else if (event.keyCode === 32 && chan2.paused) chan2.play();
    break;
  default:
    if(event.keyCode === 32 && !chan1.paused) chan1.pause();
    else if (event.keyCode === 32 && chan1.paused) chan1.play();
    break;
  }
};
