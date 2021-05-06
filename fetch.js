const data = [];
const URL = `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/44418/`;

fetch(URL)
    .then(res => res.json())
    .then(res => data.push(res))
    .catch(err => data.push(err))

module.exports = data;