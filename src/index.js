import countryTpl from './countries.hbs';

const cardContainer = document.querySelector('.js-card-container')
const form = document.querySelector('form')
const requestsEl = document.querySelector('.requests')
const input = document.querySelector('.form-control')

form.addEventListener('submit', searchCard)

function searchCard(e) {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.query.value
    cardContainer.innerHTML = ''
    fetch(`https://restcountries.com/v3.1/name/${inputValue}`).then(response => response.json())
    .then((country)=> {
        console.log(country);
        if (country.length <= 1) {
            console.log(country[0].flags);
            const cardMarkUp = countryTpl(country[0])
            cardContainer.innerHTML += cardMarkUp
        }
    });
}

input.addEventListener('input', showRequests)

function showRequests(e) {
    requestsEl.innerHTML = ``
    const inputValue = e.target.value
    fetch(`https://restcountries.com/v3.1/name/${inputValue}`).then(response => response.json())
    .then((country)=> {
        for (let i = 0; i <= country.length; i++) {

        }
        const countryName = country[i].name.common.toLowerCase()
        if (countryName.includes(inputValue.toLowerCase()) && inputValue !== '') {
            if (country.length <= 10) {
                requestsEl.innerHTML += `<li>${country[0].name.common}</li>`
            }
        }
    });
}
