'use strict';

const show = document.getElementById('show');
const hide = document.getElementById('hide');
const addContainer = document.getElementById('add-container');
const addCard = document.getElementById('add-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const cardsContainer = document.getElementById('cards-container');
const current = document.getElementById('current');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const clear = document.getElementById('clear');

let userData = localStorage.getItem('cards')
  ? JSON.parse(localStorage.getItem('cards'))
  : [];
let currInd = 0;

const toggleClass = () => {
  addContainer.classList.toggle('show');
};

const userDataSave = () => {
  const qus = question.value.trim();
  const ans = answer.value.trim();
  userData.push({
    q: qus,
    a: ans,
  });

  toggleClass();
  displayUI(1);
  slideIndex(currInd + 1, userData.length);

  localStorage.setItem('cards', JSON.stringify(userData));

  question.value = '';
  answer.value = '';
};

const displayUI = (index) => {
  cardsContainer.innerHTML = '';

  userData.forEach((el, ind) => {
    cardsContainer.innerHTML += `
			<div class ="card ${ind + 1 === index ? 'active' : ''}">
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${el.q}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${el.a}
            </p>
          </div>
        </div>
      </div>`;
  });
};

const cardFlip = (e) => {
  const target = e.target;
  target.closest('.card').classList.toggle('show-answer');
};

const slideIndex = (index, total) => {
  current.textContent = `${index}/${total}`;
};

const slides = (e) => {
  if (userData.length) {
    if (e.target.closest('#next')) currInd++;
    if (e.target.closest('#prev')) currInd--;

    if (currInd <= 0) currInd = 0;
    if (currInd >= userData.length) currInd = userData.length - 1;

    slideIndex(currInd + 1, userData.length);
    cardsSlide(currInd + 1);
  }
};

const cardsSlide = (index) => {
  const allCards = document.querySelectorAll('.card');

  allCards.forEach((card, ind) => {
    if (ind + 1 === index) card.classList.add('active');
    else card.classList.remove('active');
  });
};

const clearStorage = () => {
  localStorage.removeItem('cards');
  userData = [];
  displayUI(1);
  slideIndex(0, 0);
};

//////////////////
slideIndex(userData.length ? 1 : currInd, userData.length);
displayUI(1);

show.addEventListener('click', toggleClass);
hide.addEventListener('click', toggleClass);
addCard.addEventListener('click', userDataSave);
cardsContainer.addEventListener('click', cardFlip);
next.addEventListener('click', slides);
prev.addEventListener('click', slides);
clear.addEventListener('click', clearStorage);
