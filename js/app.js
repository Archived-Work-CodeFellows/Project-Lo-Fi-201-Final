'use strict';

//build an audio constructor?
//needs global variables that will affect variables inside functions
//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var harmonySelector = document.getElementById('harmony');
var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
var chanSelector = 0;
var flagCheck = 0;

chan1.volume = 0;
chan2.volume = 0;

harmonySelector.addEventListener('click', start);

setInterval(function(){
  console.log(flagCheck);
  if(flagCheck === 1) {
    channelAfade();
  } else if (flagCheck === 2) {
    channelBfade();
  }
}, 250);

function start () {
  chan1.play();
  var start = setInterval(function () {
    if(chan1.currentTime < 10 && chan1.volume !== 1) {
      chan1.volume += 0.001;
      if(chan1.volume > 0.96) {
        chan1.volume = 1;
        chanSelector = 0;
      }
    }
    if(chan1.volume === 1 || chan1.paused === true) {
      flagCheck = 1;
      clearInterval(start);
    }
  }, 5);
  return flagCheck;
}

function channelAfade () {
  if(chan1.currentTime > chan1.duration-10 && !chan1.ended) {
    chan2.play();
    while(chan2.volume < 0.96) {
      chan1.volume -= 0.001;
      chan2.volume += 0.001;
    }
    if(chan2.volume > 0.96) {
      chan1.volume = 0;
      chan2.volume = 1;
      chanSelector = 0;
      flagCheck = 2;
    }
    return flagCheck;
  }
}

function channelBfade() {
  if(chan2.currentTime > chan2.duration-10 && !chan2.ended) {
    chan1.play();
    while(chan1.volume < 0.96){
      chan2.volume -= 0.001;
      chan1.volume += 0.001;
    }
    if(chan1.volume > 0.96) {
      chan2.volume = 0;
      chan1.volume = 1;
      chanSelector = 1;
      flagCheck = 1;
    }
  }
  return flagCheck;
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
