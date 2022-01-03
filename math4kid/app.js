'use strict';

const number1 = document.getElementById('num1');
const number2 = document.getElementById('num2');
const showGuessAns = document.querySelectorAll('.answer-options h1');
const show = document.querySelector('.show');
const ul = document.querySelector('ul');
const sign = document.getElementById('sign');

let rand1 = 0;
let rand2 = 0;
let corrAns = 0;
let randArr = [];
const audio = new Audio('wrong.mp3');

function rand() {
  const randNum = Math.floor(Math.random() * 50);
  return randNum;
}

function randNumbers() {
  rand1 = rand();
  rand2 = rand();
}

function showRandNumbers() {
  number1.textContent = rand1;
  number2.textContent = rand2;
}

function add() {
  return rand1 + rand2;
}

function subtract() {
  return rand1 - rand2;
}
function multiply() {
  return rand1 * rand2;
}
function divide() {
  return rand1 / rand2;
}

function buildRandArr() {
  const val = Math.floor(Math.random() * 3);

  if (!randArr.includes(val)) randArr.push(val);

  if (randArr.length < 3) buildRandArr();
}

function showRandArr() {
  showGuessAns[randArr[0]].textContent = rand();
  showGuessAns[randArr[1]].textContent = rand();
  showGuessAns[randArr[2]].textContent = corrAns;
}

function ckResult(e) {
  const val = +e.target.textContent;
  if (val === corrAns) {
    show.textContent = corrAns;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    audio.play();
  }
}

function changeLi(e) {
  const target = e.target;
  ul.querySelectorAll('li').forEach((li) => li.classList.remove('current'));

  target.classList.add('current');
}

buildRandArr();

showGuessAns.forEach((el) => el.addEventListener('click', ckResult));

function ulFun() {
  //todo::
  ul.querySelectorAll('li').forEach((li) => {
    const text = li.textContent;

    if (li.classList.contains('current')) {
      if (text === 'Add') {
        sign.textContent = '+';
        randNumbers();
        ckBigNum();
        showRandNumbers();
        corrAns = add();
        showRandArr();
      }
      if (text === 'Subtract') {
        sign.textContent = '-';
        randNumbers();
        ckBigNum();
        showRandNumbers();
        corrAns = subtract();
        showRandArr();
      }
      if (text === 'Multiply') {
        sign.textContent = 'x';
        randNumbers();
        ckBigNum();
        showRandNumbers();
        corrAns = multiply();
        showRandArr();
      }
      if (text === 'Divide') {
        sign.textContent = '/';
        randNumbers();
        ckBigNum();

        if (rand1 % rand2 !== 0) ulFun();

        showRandNumbers();
        corrAns = divide();
        showRandArr();
      }
    }
  });
}

function ckBigNum() {
  //todo
  if (rand1 < rand2) {
    let store = rand1;
    rand1 = rand2;
    rand2 = store;
  }
}

//////////////////
ulFun();

ul.addEventListener('click', ulFun);
ul.querySelectorAll('li').forEach((li) =>
  li.addEventListener('click', changeLi)
);
