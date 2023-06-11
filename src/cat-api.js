const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
async function fetchBreeds() {
  return fetch(`${BASE_URL}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}

async function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_kC6jvNAdLNzKFQvhHELbn8x02k6W0wCP14oVDeGVWUCIiRxXvvLo4lfIWq7LpUA6`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(singleDataBreed => {
      return singleDataBreed;
    });
}

export { fetchBreeds, fetchCatByBreed };
