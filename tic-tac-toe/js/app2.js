'use strict';

const allBoxes = document.querySelectorAll('ul li span');
const xEl = document.getElementById('x');
const oEl = document.getElementById('o');
const leftEl = document.getElementById('left');
const endEl = document.getElementById('end');
const overlyaEl = document.querySelector('.overlay');
const reStartEl = document.querySelector('.re-start');
const resultEl = document.querySelector('.result');
const activePlayerX = document.querySelector('.name .x');
const activePlayerO = document.querySelector('.name .o');

let player = 'X';
let xScores = 0;
let oScores = 0;
let leftGame = 0;
let endGame = 5;
let playerChoosen = [
  {
    id: 1,
    player: null,
  },
  {
    id: 2,
    player: null,
  },
  {
    id: 3,
    player: null,
  },
  {
    id: 4,
    player: null,
  },
  {
    id: 5,
    player: null,
  },
  {
    id: 6,
    player: null,
  },
  {
    id: 7,
    player: null,
  },
  {
    id: 8,
    player: null,
  },
  {
    id: 9,
    player: null,
  },
];
let winNumbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let winnerArr = [];

const audio = new Audio('./wrong.mp3');

const showUserClick = (e) => {
  const target = e.target;
};
