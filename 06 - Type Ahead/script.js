const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

//fetch will return a promise
fetch(endpoint)
// .then(blob => console.log(blob))
//data that comes back from fetch, it doesn't know what it's coming back yet; blob needs to be converted from raw data into JSON
.then(blob => blob.json())
.then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //here we need to figure out if city/state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) ||  place.state.match(regex)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//whenever someone changes the values
function displayMatches() {
    // console.log(this.value)
    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray)
    const html = matchArray.map(place => {
    //find whatever is in regex
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)