'use strict';

document.getElementById('myProfile').style.display = 'none';

document.getElementById('home').addEventListener('click', function () {
  window.location.href = '../index.html';
});

document.getElementById('artists').addEventListener('click', function () {
  window.location.href = 'artists.html';
});
