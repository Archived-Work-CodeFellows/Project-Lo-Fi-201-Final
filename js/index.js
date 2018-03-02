'use strict';
// debugger;

document.getElementById('home').addEventListener('click', function () {
  window.location.href = 'index.html';
});

document.getElementById('contribute').addEventListener('click', function () {
  window.location.href = 'pages/contribute.html';
});

var playHarmonyBtn = document.getElementById('playHarmony');
var playChaosBtn = document.getElementById('playChaos');
var harmonyListItem = document.getElementById('harmonyListItem');
var chaosListItem = document.getElementById('chaosListItem');

playHarmonyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (harmonyListItem.classList.contains('minimized')) {
    harmonyListItem.classList.toggle('minimized',false);
    harmonyListItem.classList.toggle('maximized',true);
  }
  if (chaosListItem.classList.contains('maximized')) {
    chaosListItem.classList.toggle('minimized',true);
    chaosListItem.classList.toggle('maximized',false);
  }
});

playChaosBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (chaosListItem.classList.contains('minimized')) {
    chaosListItem.classList.toggle('minimized',false);
    chaosListItem.classList.toggle('maximized',true);
  }
  if (harmonyListItem.classList.contains('maximized')) {
    harmonyListItem.classList.toggle('minimized',true);
    harmonyListItem.classList.toggle('maximized',false);
  }
});
