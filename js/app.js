'use strict';

//build an audio constructor?
//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var harmonySelector = document.getElementById('harmonic');
var chaosSelector = document.getElementById('chaotic');
var slider = document.getElementById('volume');
var userVolume = 0;
var userToggle = false;
var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
var chan3 = document.getElementById('channelC');
var chan4 = document.getElementById('channelD');
var compare = null;
var compare2 = null;
Audio_src.all = [];
var moodSelector = ' ';
var flagCheck = 0;
//var userVolume = 0.96; //For algorithm purposes

chan1.volume = 0;
chan2.volume = 0;
chan3.volume = 0;
chan4.volume = 0;

harmonySelector.addEventListener('click', start);
chaosSelector.addEventListener('click', start2);

function Audio_src(trackNum){
  this.chan1 = chan1;
  this.chan2 = chan2;
  this.harmonyPath = 'audio/harmony/harmony_'+trackNum+'.mp3';
  this.chaosPath = 'audio/chaos/chaos_'+trackNum+'.mp3';
  Audio_src.all.push(this);
}
for(var i = 1; i < 5; i++) new Audio_src(i);
//Harmony Random
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
//Chaos Random
function setRandomC() {
  console.log('random chan3');
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);
    console.log(indexRandom);
  } while (compare2 === indexRandom);
  chan3.setAttribute('src', Audio_src.all[indexRandom].chaosPath);
  return compare2 = indexRandom;
}
function setRandomD() {
  console.log('random chan4');
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);
    console.log(indexRandom);
  } while (compare2 === indexRandom);
  chan4.setAttribute('src', Audio_src.all[indexRandom].chaosPath);
  return compare2 = indexRandom;
}

setRandomA();
setRandomB();
setRandomC();
setRandomD();

setInterval(function(){
  userVolume = parseFloat(slider.value);
  if(moodSelector === 'harmony'){
    if(userToggle === true) {
      chan1.volume = userVolume;
      chan2.volume = userVolume;
      if(flagCheck === 1) {
        channelAfade();
      } else if (flagCheck === 2) {
        channelBfade();
      }
    }
  } else if (moodSelector === 'chaos') {
    if(flagCheck === 1) {
      channelCfade();
    } else if (flagCheck === 2) {
      channelDfade();
    }
  }
}, 250);


//Harmony Section
function start () {
  chan1.play();
  moodSelector = 'harmony';
  var start = setInterval(function () {
    if(chan1.currentTime < 10 && chan1.volume !== userVolume) {
      chan1.volume += 0.001;
      console.log(chan1.volume);
      if(chan1.volume > userVolume) {
        chan1.volume = userVolume;
      }
    }
    if(chan1.volume === userVolume || chan1.paused === true) {
      flagCheck = 1;
      userToggle = true;
      clearInterval(start);
    }
  }, 5);
  return flagCheck, moodSelector, userToggle;
}

function channelAfade () {
  if(chan1.currentTime > chan1.duration-10 && !chan1.ended) {
    flagCheck = 2;
    chan2.volume = 0;
    chan2.play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(chan2.currentTime < 10 && chan2.volume !== volumeStore){
        chan1.volume -= 0.001;
        chan2.volume += 0.001;
        console.log(chan2.volume);
        if(chan2.volume > volumeStore || chan1.volume < 0.001) {
          chan1.volume = 0;
          chan2.volume = volumeStore;
        }
      }
      if(chan2.volume === volumeStore) {
        setRandomA();
        userToggle = true;
        clearInterval(fade);
      }
    }, 5);
  }
  console.log(flagCheck+'FLAG');
  return flagCheck, userToggle;
}

function channelBfade() {
  if(chan2.currentTime > chan2.duration-10 && !chan2.ended) {
    flagCheck = 1;
    chan1.volume = 0;
    chan1.play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(chan1.currentTime < 10 && chan1.volume !== volumeStore){
        chan2.volume -= 0.001;
        chan1.volume += 0.001;
        if(chan1.volume > volumeStore || chan2.volume < 0.001) {
          chan2.volume = 0;
          chan1.volume = volumeStore;
        }
      }
      if(chan1.volume === userVolume) {
        setRandomB();
        userToggle = true;
        clearInterval(fade);
      }
    }, 5);
  }
  console.log(flagCheck+'FLAG');
  return flagCheck, userToggle;
}

//Chaos Section
function start2 () {
  chan3.play();
  moodSelector = 'chaos';
  var start = setInterval(function () {
    if(chan3.currentTime < 10 && chan3.volume !== userVolume) {
      chan3.volume += 0.001;
      if(chan3.volume > userVolume) {
        chan3.volume = userVolume;
      }
    }
    if(chan3.volume === userVolume || chan3.paused === true) {
      flagCheck = 1;
      clearInterval(start);
    }
  }, 5);
  return flagCheck;
}

function channelCfade () {
  if(chan3.currentTime > chan3.duration-10 && !chan3.ended) {
    chan4.play();
    var fade = setInterval(function(){
      if(chan4.volume < userVolume){
        chan3.volume -= 0.001;
        chan4.volume += 0.001;
      } else clearInterval(fade);
    }, 30);
    if(chan4.volume > userVolume) {
      chan3.volume = 0;
      chan4.volume = userVolume;
      setRandomC();
      flagCheck = 2;
    }
    return flagCheck;
  }
}

function channelDfade() {
  if(chan4.currentTime > chan4.duration-10 && !chan4.ended) {
    chan3.play();
    var fade = setInterval(function(){
      if(chan3.volume < userVolume){
        chan4.volume -= 0.001;
        chan3.volume += 0.001;
      } else clearInterval(fade);
    }, 30);
    if(chan3.volume > userVolume) {
      chan4.volume = 0;
      chan3.volume = userVolume;
      setRandomD();
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

