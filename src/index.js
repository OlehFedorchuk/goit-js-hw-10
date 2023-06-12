import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const divEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', () => {
  loaderEl.hidden = false;
  // errorEl.hidden = true;

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
      loaderEl.hidden = true;
      // errorEl.hidden = true;
    })
    .catch(error => console.log(error));

  selectEl.addEventListener('change', () => {
    loaderEl.hidden = false;
    errorEl.hidden = true;

    const value = getValue();
    fetchCatByBreed(value).then(data => {
      if (data.length === 0) {
        reset();
      }
      displayCatInfo(data);
      loaderEl.hidden = true;
    });
  });
});

function populateBreedSelect(breeds) {
  const markup = breeds.map(breed => {
    return `<option value=${breed.id}>${breed.name}</option>`;
  });
  selectEl.innerHTML = markup;
}

function getValue() {
  const selectedOption = selectEl.options[selectEl.selectedIndex];
  const selectedValue = selectedOption.value;
  return selectedValue;
}

function displayCatInfo(data) {
  divEl.innerHTML = `<img class='img' src="${data[0].url}" alt="cat" width="350" height="350"><div class = 'x'><h3>${data[0].breeds[0].name}</h3><p>${data[0].breeds[0].description}</p><p><span class='Accent'>Temperament:</span> ${data[0].breeds[0].temperament}</p></div>`;
}
function reset() {
  console.log('data is empty');
  loaderEl.hidden = true;
  errorEl.hidden = false;
  divEl.innerHTML = ``;
}
