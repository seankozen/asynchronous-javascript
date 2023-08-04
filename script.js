'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/

// const getCountryData = country => {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.response);
//     console.log(data);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} million people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('japan');
// getCountryData('usa');
// getCountryData('ukraine');

const renderCountry = (data, className = '') => {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population > 1000000? (+data.population / 1000000 ).toFixed(1) + " million" : +data.population} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbor = country => {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.response);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     if(!data.borders) return;

//     const neighborArray = data.borders;
//     const randomCountry = Math.floor(Math.random() * neighborArray.length);

//     const neighbor = neighborArray[randomCountry];

//     console.log(neighbor);

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       // Render country 1
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// //getCountryAndNeighbor('usa');
// //getCountryAndNeighbor('japan');
// getCountryAndNeighbor('germany');

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// const getRandomCountry = array => {
//   const randomCountry = Math.floor(Math.random() * array.length);
//   return randomCountry;
// };

// // Fetch and promises
// const request = fetch(`https://restcountries.com/v2/name/${'japan'}`);
// console.log(request);

// const getCountryData = country => {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       if (!data[0].borders) return;

//       const neighbors = data[0].borders;
//       const country2 = neighbors[getRandomCountry(neighbors)];

//       // Get neighbor country (2)
//       return fetch(`https://restcountries.com/v2/alpha/${country2}`)
//         .then(response => response.json())
//         .then(data => renderCountry(data, 'neighbour'));
//     });
// };

// //getCountryData('spain');
// getCountryData('russia');

// Fetch and promises
const request = fetch(`https://restcountries.com/v2/name/${'japan'}`);
console.log(request);

const getCountryData = country => {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) return;


      // Get neighbor country (2)
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'));
};
