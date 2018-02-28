'use strict';

//event function for spacebar to play audio, switch between the two playing channels
//needs local storage (For volume and selection)

var harmonySelector = document.getElementById('playHarmony');
var chaosSelector = document.getElementById('playChaos');
var slider = document.getElementById('volume');
var playButton = document.getElementById('play');
var chan1 = document.getElementById('channelA');
var chan2 = document.getElementById('channelB');
var chan3 = document.getElementById('channelC');
var chan4 = document.getElementById('channelD');
var userVolume = 0;
var userToggle = false;
var compare = null;
var activeChannel = null;
Audio_src.all = [];
var moodSelector = ' ';
var flagCheck = 0;

harmonySelector.addEventListener('click', start);
chaosSelector.addEventListener('click', startChaos);

function Audio_src(trackNum){
  this.harmonyPath = 'audio/harmony/harmony_'+trackNum+'.mp3';
  this.chaosPath = 'audio/chaos/chaos_'+trackNum+'.mp3';
  Audio_src.all.push(this);
}
function setRandom() {
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);
    console.log('dupes');
  } while (compare === indexRandom);
  return compare = indexRandom;
}
function initialize() {
  chan1.volume = 0;
  chan2.volume = 0;
  chan3.volume = 0;
  chan4.volume = 0;
  for(var i = 1; i < 5; i++) new Audio_src(i);
  chan1.setAttribute('src', Audio_src.all[setRandom()].harmonyPath);
  chan2.setAttribute('src', Audio_src.all[setRandom()].harmonyPath);
  chan3.setAttribute('src', Audio_src.all[setRandom()].chaosPath);
  chan4.setAttribute('src', Audio_src.all[setRandom()].chaosPath);
}
initialize();

function playing() {
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
  chan3.pause(), chan4.pause(), chan3.currentTime = 0, chan4.currentTime = 0;
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
        chan1.setAttribute('src', Audio_src.all[setRandom()].harmonyPath);
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
        chan2.setAttribute('src', Audio_src.all[setRandom()].harmonyPath);
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
  chan1.pause(), chan2.pause(), chan1.currentTime = 0, chan2.currentTime = 0;
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
        chan3.setAttribute('src', Audio_src.all[setRandom()].chaosPath);
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
        chan4.setAttribute('src', Audio_src.all[setRandom()].chaosPath);
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