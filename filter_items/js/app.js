'use strict';

const itemWrapper = document.querySelector('#item-wrapper');
const storeItems = document.querySelectorAll('#store-items > div');
const searchItem = document.querySelector('#search-item');

function setCurrentClass(e) {
  const target = e.target;
  if (target.localName === 'a') {
    itemWrapper.querySelectorAll('a').forEach((e) => {
      e.classList.remove('current');
    });
    target.classList.add('current');

    return target.textContent.trim();
  }
}

function filterItems(e) {
  const getItem = setCurrentClass(e);

  storeItems.forEach((div) => {
    const dataItem = div.getAttribute('data-item');

    if (getItem !== 'all') {
      if (getItem === dataItem) div.style.display = 'block';
      else div.style.display = 'none';
    } else div.style.display = 'block';
  });
}

function searchFun() {
  const userValues = searchItem.value.trim();

  storeItems.forEach((div) => {
    const dataSearch = div.getAttribute('data-item');
    const result = dataSearch.search(userValues);

    if (result > -1) div.style.display = 'block';
    else div.style.display = 'none';
  });
}

itemWrapper.addEventListener('click', filterItems);
searchItem.addEventListener('keyup', searchFun);
