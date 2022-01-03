'use strict';

const holes = document.querySelectorAll('.hole');
const startbutton = document.querySelector('.startbutton');
const score = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdown = document.querySelector('.countdown');
const span = document.querySelector('span');

let times = 60;
let randomHole = 0;
let scores = 0;

function gameRun() {
  const minite = String(Math.floor(times / 60)).padStart(2, '0');
  const sec = String(Math.floor(times % 60)).padStart(2, '0');
  startbutton.style.display = 'none';
  randomHole = Math.floor(Math.random() * holes.length);
  const timeRandomChange = Math.floor(Math.random() * (3000 - 1000)) + 1000;
  //==========
  if (times > -1) {
    times--;

    setTimeout(() => {
      holes[randomHole].classList.add('up');
      countdown.textContent = `${minite}:${sec}`;
    }, 1000);

    setTimeout(() => {
      holes.forEach((hole) => hole.classList.remove('up'));
      gameRun();
    }, timeRandomChange);
  } else {
    alert(`Your Score Is ${scores}`);
    location.reload();
  }
}

function molesCount() {
  scores++;
  score.textContent = scores;
  moles[randomHole].classList.add('hard');
  moles[randomHole].style.pointerEvents = 'none';

  setTimeout(() => {
    moles.forEach((mole) => {
      mole.classList.remove('hard');
    });
    moles.forEach((mole) => {
      mole.style.pointerEvents = 'auto';
    });
  }, 900);
}

startbutton.addEventListener('click', gameRun);
moles.forEach((el) => el.addEventListener('click', molesCount));

//-25-10-5=20
//-25-10-5=40
