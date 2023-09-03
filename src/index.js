import countryTpl from './countries.hbs';

const cardContainer = document.querySelector('.js-card-container')
const requestsEl = document.querySelector('.requests')
const input = document.querySelector('.form-control')

input.addEventListener('input',  _.debounce(showRequests,500))

function getData(inputValue) {
    return fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then(response => response.json())
}


function searchCountryData(country) {
    const countryLanguagesLenght = Object.values(country[0].languages).length
    const cardMarkUp = countryTpl(country[0])
    cardContainer.innerHTML += cardMarkUp
    const listGroup = document.querySelector('.list-group')
    for (let i = 0 ;i < countryLanguagesLenght; i++) {
        listGroup.innerHTML += `<li class="list-group-item">${Object.values(country[0].languages)[i]}</li> `
    }
}

function showRequests(e) {
    const inputValue = e.target.value
    cardContainer.innerHTML = ''
    getData(inputValue)
    .then((country)=> {
        requestsEl.innerHTML = ``
        if (country.length <= 10) {
            for (let i = 0; i < country.length; i++) {
                const countryName = country[i].name.common.toLowerCase()
                if (countryName.includes(inputValue.toLowerCase()) && inputValue !== '') {
                    requestsEl.innerHTML += `<li>${country[i].name.common}</li>`
                }
            }
        } else {
            PNotify.error({
                text: 'Знайдено надто багато країн!',
            });
        }
        if (country.length <= 1) {
            searchCountryData(country)
        }
    });
}
