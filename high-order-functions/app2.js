'use strict';

const addUser = document.querySelector('#add-user');
const main = document.querySelector('#main');
const double = document.querySelector('#double');
const million = document.querySelector('#show-millionaires');
const calculate = document.querySelector('#calculate-wealth');
const sort = document.querySelector('#sort');
const reset = document.querySelector('#reset');

let userDataArr = [];
let richest = false;

if (localStorage.getItem('user') !== null) localStorage.removeItem('user');

async function addUserFun(user) {
  const link = `https://randomuser.me/api/?results=${user}`;
  const res = await fetch(link);
  const data = await res.json();
  dataStore(data);
  displayUI();
}
//(12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
function displayUI(richest = null) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  userDataArr.forEach((data) => {
    main.innerHTML += `
    <div class="person">
				<img width="40" height="40"
				src="${data.img}"
				alt="">
				<strong>${data.name}</strong>
				<strong class="milli ${richest ? 'show' : ''}">
				${data.money > 1000000 - 1 ? '⭐' : ''}
				</strong>
				<span>$${data.money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
    </div>`;
  });
}

function dataStore(data) {
  data.results.forEach((user) => {
    userDataArr.push({
      name: `${user.name.first} ${user.name.last}`,
      img: `${user.picture.thumbnail}`,
      money: rendomMony(),
    });
  });
  if (localStorage.getItem('user') === null)
    localStorage.setItem('user', JSON.stringify(userDataArr));
}

function rendomMony() {
  return Math.floor(Math.random() * 1000000);
}

function doubleMony() {
  userDataArr.map((user) => (user.money = user.money * 2));
  displayUI();
}

function showMillion() {
  richest = richest ? false : true;
  displayUI(richest);
}

function sortFun() {
  userDataArr = userDataArr.sort((a, b) => b.money - a.money);
  displayUI();
}

function calculateFun() {
  const getMoney = userDataArr.map((mn) => mn.money);
  const total = getMoney.reduce((a, b) => a + b);
  displayUI();
  main.innerHTML += `
<div>
  <h3>Total Wealth: <strong>$${total
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}</strong></h3>
</div>
	`;
}

function resetFun() {
  userDataArr = JSON.parse(localStorage.getItem('user'));
  displayUI();
}

addUserFun(5);
addUser.addEventListener('click', () => addUserFun(1));
double.addEventListener('click', doubleMony);
million.addEventListener('click', showMillion);
sort.addEventListener('click', sortFun);
calculate.addEventListener('click', calculateFun);
reset.addEventListener('click', () => {
  const answer = prompt('Do you really want to reset yes/no?');
  if (answer.toLocaleLowerCase() === 'yes') {
    resetFun();
  }
});
