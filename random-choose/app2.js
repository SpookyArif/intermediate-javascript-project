'use strict';

const textarea = document.querySelector('textarea');
const tags = document.querySelector('#tags');
const container = document.querySelector('.container');

let arrs = [];

function ckMe(e) {
  if (e.key !== 'Enter') {
    const str = textarea.value.trim();
    arrs = str.split(',').filter((arr) => arr.trim() !== '');
    lags.innerHTML = arrs
      .map((arr) => `<span class='tag'>${arr}</span>`)
      .join(' ');
  }
}

function randomChoose(e) {}

textarea.addEventListener('click', ckMe);
document.addEventListener('keypress', randomChoose);
