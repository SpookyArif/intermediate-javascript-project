'use strict';

const ul = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeoples = [
  'Jeff Bezos',
  'Elon Musk',
  'Bernard Arnault',
  'Mark Zuckerberg',
  'Bill Gates',
  'Larry Page',
  'Larry Ellison',
  'Sergey Brin',
  'Warren Buffett',
  'Mr EX',
];

let dragItemEl,
  allLi,
  dropItemEl,
  randIndex = [];

function randomFunc() {
  const rand = Math.floor(Math.random() * richestPeoples.length);

  if (!randIndex.includes(rand)) randIndex.push(rand);

  if (randIndex.length <= 9) randomFunc();
  else displayUI(randIndex);
}

function displayUI(randArr) {
  randArr.forEach((val, ind) => {
    const html = `
			<li ondrop="dragDrop(event)" ondragend="dragEnd(event)" ondragover="dragOver(event)" data-index="${ind}">
				<span class="number">${ind + 1}</span>
				<div class="draggable" draggable="true">
				<img width="50" src="img/${val}.jpg" />
					<p class="person-name">${richestPeoples[val]}</p>
					<i class="fas fa-grip-lines"></i>
				</div>
			</li>`;

    ul.insertAdjacentHTML('beforeend', html);
  });
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  dragItemEl = e.target.closest('div');
  allLi = document.querySelectorAll('ul li');
}

function dragEnd(e) {
  dropItemEl = e.target.closest('div');

  const dragIndex = dragItemEl.parentElement.getAttribute('data-index');
  const dropIndex = dropItemEl.parentElement.getAttribute('data-index');

  if (dragIndex !== dropIndex) {
    allLi[dragIndex].removeChild(dragItemEl);
    allLi[dropIndex].removeChild(dropItemEl);

    allLi[dragIndex].appendChild(dropItemEl);
    allLi[dropIndex].appendChild(dragItemEl);
  }
}

function checkItem() {
  richestPeoples.forEach((val, ind) => {
    if (!allLi) return;

    const name = allLi[ind].querySelector('.person-name').textContent;

    if (val === name) {
      allLi[ind].classList.add('right');
      allLi[ind].classList.remove('wrong');
    } else {
      allLi[ind].classList.add('wrong');
      allLi[ind].classList.remove('right');
    }
  });
}

randomFunc();
check.addEventListener('click', checkItem);
