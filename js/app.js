'use strict';

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
var mixer = [];
var moodSelector = ' ';
var flagCheck = 0;

harmonySelector.addEventListener('click', function() {
  start('harmony');
});
chaosSelector.addEventListener('click', function(){
  start('chaos');
});

function Audio_src(trackNum){
  this.harmonyPath = 'audio/harmony/harmony_'+trackNum+'.mp3';
  this.chaosPath = 'audio/chaos/chaos_'+trackNum+'.mp3';
  Audio_src.all.push(this);
}
function setRandom() {
  do {
    var indexRandom = Math.floor(Math.random()*Audio_src.all.length);
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
  if(activeChannel.paused === true) {
    playButton.onclick = activeChannel.play();
    playButton.style.backgroundPositionX = '0%';
  } else {
    playButton.onclick = activeChannel.pause();
    playButton.style.backgroundPositionX = '99%';
  }
}

setInterval(function(){
  userVolume = parseFloat(slider.value);
  if(userToggle === true) {
    if(flagCheck === 1) {
      channelAfade();
      activeChannel = mixer[0][0];
      mixer[0][0].volume = userVolume;
    } else if (flagCheck === 2) {
      channelBfade();
      activeChannel = mixer[0][1];
      mixer[0][1].volume = userVolume;
    }
  }
}, 1);

function start(selection) {
  moodSelector = selection;
  if(moodSelector === 'harmony') {
    mixer = [];
    mixer.push([chan1,chan2],[chan3,chan4]);
  } else if (moodSelector === 'chaos'){
    mixer = [];
    mixer.push([chan3,chan4],[chan1,chan2]);
  }
  mixer[0][0].play();
  mixer[1][0].pause(), mixer[1][1].pause(), mixer[1][0].currentTime = 0, mixer[1][1].currentTime = 0;
  var start = setInterval(function () {
    if(mixer[0][0].currentTime < 10 && mixer[0][0].volume !== userVolume) {
      mixer[0][0].volume += 0.001;
      if(mixer[0][0].volume > userVolume) {
        mixer[0][0].volume = userVolume;
      }
    }
    if(mixer[0][0].volume === userVolume || mixer[0][0].paused === true) {
      flagCheck = 1;
      userToggle = true;
      clearInterval(start);
    }
  }, 5);
  activeChannel = mixer[0][0];
  playButton.addEventListener('click', playing);
  return flagCheck, moodSelector, userToggle;
}

function channelAfade () {
  if(mixer[0][0].currentTime > mixer[0][0].duration-10 && !mixer[0][0].ended) {
    flagCheck = 2;
    playButton.removeEventListener('click', playing);
    mixer[0][1].volume = 0;
    mixer[0][1].play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(mixer[0][1].currentTime < 10 && mixer[0][1].volume !== volumeStore){
        mixer[0][0].volume -= 0.001;
        mixer[0][1].volume += 0.001;
        if(mixer[0][1].volume > volumeStore || mixer[0][0].volume < 0.001) {
          mixer[0][0].volume = 0;
          mixer[0][1].volume = volumeStore;
        }
      }
      if(mixer[0][1].volume === volumeStore) {
        mixer[0][0].setAttribute('src', Audio_src.all[setRandom()].harmonyPath);
        userToggle = true;
        playButton.addEventListener('click', playing);
        clearInterval(fade);
      }
    }, 5);
  }
  return flagCheck, userToggle;
}

function channelBfade() {
  if(mixer[0][1].currentTime > mixer[0][1].duration-10 && !mixer[0][1].ended) {
    playButton.removeEventListener('click', playing);
    flagCheck = 1;
    mixer[0][0].volume = 0;
    mixer[0][0].play();
    userToggle = false;
    var volumeStore = userVolume;
    var fade = setInterval(function(){
      if(mixer[0][0].currentTime < 10 && mixer[0][0].volume !== volumeStore){
        mixer[0][1].volume -= 0.001;
        mixer[0][0].volume += 0.001;
        if(mixer[0][0].volume > volumeStore || mixer[0][1].volume < 0.001) {
          mixer[0][1].volume = 0;
          mixer[0][0].volume = volumeStore;
        }
      }
      if(mixer[0][0].volume === userVolume) {
        mixer[0][1].setAttribute('src', Audio_src.all[setRandom()].harmonyPath);
        userToggle = true;
        playButton.addEventListener('click', playing);
        clearInterval(fade);
      }
    }, 5);
  }
  return flagCheck, userToggle;
}

document.body.onkeydown = function(event){
  if(event.keyCode === 32) {
    event.preventDefault();
    playButton.click();
  }
};