'use strict';
 debugger;

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

  if (harmonyListItem.classList.contains('maximized')) {
    harmonyListItem.classList.toggle('maximized',false);
    chaosListItem.classList.toggle('maximized',false);
    document.getElementById('playHarmony').textContent = 'Play this mood';
  } else {
    harmonyListItem.classList.toggle('maximized',true);
    document.getElementById('playHarmony').textContent = '(minimize)';
    chaosListItem.classList.toggle('maximized',false);
    document.getElementById('playChaos').textContent = 'Play this mood';
  }
});

playChaosBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (chaosListItem.classList.contains('maximized')) {
    harmonyListItem.classList.toggle('maximized',false);
    chaosListItem.classList.toggle('maximized',false);
    document.getElementById('playChaos').textContent = 'Play this mood';
  } else {
    harmonyListItem.classList.toggle('maximized',false);
    document.getElementById('playHarmony').textContent = 'Play this mood';
    chaosListItem.classList.toggle('maximized',true);
    document.getElementById('playChaos').textContent = '(minimize)';
  }
});
