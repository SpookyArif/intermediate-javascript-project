'use strict';

const itemWrapper = document.querySelectorAll('#item-wrapper > a');
const storeItems = document.querySelectorAll('#store-items > div');
const searchItem = document.querySelector('#search-item');

function itemWrapperSelect(e) {
  const target = e.target;
  itemWrapper.forEach((el) => el.classList.remove('current'));
  target.classList.add('current');
  const value = target.textContent.trim();

  storeItems.forEach((div) => {
    const dataItem = div.getAttribute('data-item');
    if (value !== 'all') {
      if (value === dataItem) {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    } else {
      div.style.display = 'block';
    }
  });
}

function searchItemFun() {
  const userValues = searchItem.value.trim();
  storeItems.forEach((div) => {
    const dataSearch = div.getAttribute('data-item');
    const result = dataSearch.search(userValues);

    if (result > -1) div.style.display = 'block';
    else div.style.display = 'none';
  });
}

itemWrapper.forEach((a) => a.addEventListener('click', itemWrapperSelect));
searchItem.addEventListener('keyup', searchItemFun);
