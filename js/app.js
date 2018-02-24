'use strict';

//build an audio constructor?
//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var harmonySelector = document.getElementById('harmonic');
var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
var compare = null;
Audio_src.all = [];
var moodSelector = ' ';
var flagCheck = 0;
var userVolume = 0.96; //For algorithm purposes

chan1.volume = 0;
chan2.volume = 0;

harmonySelector.addEventListener('click', start);

function Audio_src(trackNum){
  this.chan1 = chan1;
  this.chan2 = chan2;
  this.harmonyPath = 'audio/harmony/harmony_'+trackNum+'.mp3';
  this.chaosPath = 'audio/chaos/chaos_'+trackNum+'.mp3';
  Audio_src.all.push(this);
}
for(var i = 1; i < 5; i++) new Audio_src(i);

function setRandomA() {
  console.log('random chan1');
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);
    console.log(indexRandom);
  } while (compare === indexRandom);
  chan1.setAttribute('src', Audio_src.all[indexRandom].harmonyPath);
  return compare = indexRandom;
}
function setRandomB() {
  console.log('random chan2');
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);
    console.log(indexRandom);
  } while (compare === indexRandom);
  chan2.setAttribute('src', Audio_src.all[indexRandom].harmonyPath);
  return compare = indexRandom;
}
setRandomA();
setRandomB();

setInterval(function(){
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
      if(chan1.volume > userVolume) {
        chan1.volume = 1;
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
    var fade = setInterval(function(){
      if(chan2.volume < userVolume){
        chan1.volume -= 0.001;
        chan2.volume += 0.001;
      } else clearInterval(fade);
    }, 30);
    if(chan2.volume > userVolume) {
      chan1.volume = 0;
      chan2.volume = 1;
      setRandomA();
      flagCheck = 2;
    }
    return flagCheck;
  }
}

function channelBfade() {
  if(chan2.currentTime > chan2.duration-10 && !chan2.ended) {
    chan1.play();
    var fade = setInterval(function(){
      if(chan1.volume < userVolume){
        chan2.volume -= 0.001;
        chan1.volume += 0.001;
      } else clearInterval(fade);
    }, 30);
    if(chan1.volume > userVolume) {
      chan2.volume = 0;
      chan1.volume = 1;
      setRandomB();
      flagCheck = 1;
    }
  }
  return flagCheck;
}

document.body.onkeydown = function(event){

  if(event.keyCode === 32 && flagCheck === 1) chan1.pause();
  //if (event.keyCode === 32 && flagCheck === 1 && chan1.pause() === true) chan1.play();
  if(event.keyCode === 32 && flagCheck === 2) chan2.pause();
  //if (event.keyCode === 32 && flagCheck === 2 && chan2.pause() === true) chan2.play();

};

