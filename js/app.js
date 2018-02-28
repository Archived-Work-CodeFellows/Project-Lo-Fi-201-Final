'use strict';

//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var harmonySelector = document.getElementById('playHarmony');
var chaosSelector = document.getElementById('playChaos');
var slider = document.getElementById('volume');
var playButton = document.getElementById('play');
var userVolume = 0;
var userToggle = false;
var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
var chan3 = document.getElementById('channelC');
var chan4 = document.getElementById('channelD');
var compare = null;
var compare2 = null;
var activeChannel = null;
Audio_src.all = [];
var moodSelector = ' ';
var flagCheck = 0;
//var userVolume = 0.96; //For algorithm purposes

chan1.volume = 0;
chan2.volume = 0;
chan3.volume = 0;
chan4.volume = 0;

harmonySelector.addEventListener('click', start);
chaosSelector.addEventListener('click', startChaos);

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
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);

  } while (compare === indexRandom);
  chan1.setAttribute('src', Audio_src.all[indexRandom].harmonyPath);
  return compare = indexRandom;
}
function setRandomB() {
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);

  } while (compare === indexRandom);
  chan2.setAttribute('src', Audio_src.all[indexRandom].harmonyPath);
  return compare = indexRandom;
}
//Chaos Random
function setRandomC() {
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);

  } while (compare2 === indexRandom);
  chan3.setAttribute('src', Audio_src.all[indexRandom].chaosPath);
  return compare2 = indexRandom;
}
function setRandomD() {
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);

  } while (compare2 === indexRandom);
  chan4.setAttribute('src', Audio_src.all[indexRandom].chaosPath);
  return compare2 = indexRandom;
}

setRandomA();
setRandomB();
setRandomC();
setRandomD();

function playing() {
  console.log(activeChannel);
  if(activeChannel.paused === true) playButton.onclick = activeChannel.play();
  else playButton.onclick = activeChannel.pause();
}

setInterval(function(){
  userVolume = parseFloat(slider.value);
  if(moodSelector === 'harmony'){
    if(userToggle === true) {
      if(flagCheck === 1) {
        channelAfade();
        activeChannel = chan1;
        chan1.volume = userVolume;
      } else if (flagCheck === 2) {
        channelBfade();
        activeChannel = chan2;
        chan2.volume = userVolume;
      }
    }
  } else if (moodSelector === 'chaos') {
    if(userToggle === true) {
      if(flagCheck === 1) {
        channelCfade();
        activeChannel = chan3;
        chan3.volume = userVolume;
      } else if (flagCheck === 2) {
        channelDfade();
        activeChannel = chan4;
        chan4.volume = userVolume;
      }
    }
  }
}, 1);


//Harmony Section
function start () {
  chan1.play();
  moodSelector = 'harmony';
  var start = setInterval(function () {
    if(chan1.currentTime < 10 && chan1.volume !== userVolume) {
      chan1.volume += 0.001;
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
  activeChannel = chan1;
  playButton.addEventListener('click', playing);
  return flagCheck, moodSelector, userToggle;
}

function channelAfade () {
  if(chan1.currentTime > chan1.duration-10 && !chan1.ended) {
    flagCheck = 2;
    playButton.removeEventListener('click', playing);
    chan2.volume = 0;
    chan2.play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(chan2.currentTime < 10 && chan2.volume !== volumeStore){
        chan1.volume -= 0.001;
        chan2.volume += 0.001;
        if(chan2.volume > volumeStore || chan1.volume < 0.001) {
          chan1.volume = 0;
          chan2.volume = volumeStore;
        }
      }
      if(chan2.volume === volumeStore) {
        setRandomA();
        userToggle = true;
        playButton.addEventListener('click', playing);
        clearInterval(fade);
      }
    }, 5);
  }
  return flagCheck, userToggle;
}

function channelBfade() {
  if(chan2.currentTime > chan2.duration-10 && !chan2.ended) {
    playButton.removeEventListener('click', playing);
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
        playButton.addEventListener('click', playing);
        clearInterval(fade);
      }
    }, 5);
  }
  return flagCheck, userToggle;
}

//Chaos Section
function startChaos () {
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
      userToggle = true;
      clearInterval(start);
    }
  }, 5);
  activeChannel = chan3;
  playButton.addEventListener('click', playing);
  return flagCheck, moodSelector, userToggle;
}

function channelCfade () {
  if(chan3.currentTime > chan3.duration-10 && !chan3.ended) {
    flagCheck = 2;
    playButton.removeEventListener('click', playing);
    chan4.volume = 0;
    chan4.play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(chan4.currentTime < 10 && chan4.volume !== volumeStore){
        chan3.volume -= 0.001;
        chan4.volume += 0.001;
        if(chan4.volume > volumeStore || chan3.volume < 0.001) {
          chan3.volume = 0;
          chan4.volume = volumeStore;
        }
      }
      if(chan4.volume === volumeStore) {
        setRandomC();
        userToggle = true;
        playButton.addEventListener('click', playing);
        clearInterval(fade);
      }
    }, 5);
  }
  return flagCheck, userToggle;
}

function channelDfade() {
  if(chan4.currentTime > chan4.duration-10 && !chan4.ended) {
    playButton.removeEventListener('click', playing);
    flagCheck = 1;
    chan3.volume = 0;
    chan3.play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(chan3.currentTime < 10 && chan3.volume !== volumeStore){
        chan4.volume -= 0.001;
        chan3.volume += 0.001;
        if(chan3.volume > volumeStore || chan4.volume < 0.001) {
          chan4.volume = 0;
          chan3.volume = volumeStore;
        }
      }
      if(chan3.volume === userVolume) {
        setRandomD();
        userToggle = true;
        playButton.addEventListener('click', playing);
        clearInterval(fade);
      }
    }, 5);
  }
  return flagCheck, userToggle;
}

document.body.onkeydown = function(event){
  if(event.keyCode === 32) playButton.click();
};