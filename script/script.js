const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.querySelector('#search-input').value

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=-38.0033&lon=-57.5528&exclude=minutely&appid=4c72c6754e67da7ee09dff08dd713e81&units=metric&lang=sp`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.current.weather[0].description)
        console.log(data.current.weather[0].icon)
        console.log(data.current.temp)
        console.log(data.hourly[0].pop)
        console.log(data.current.humidity)
        console.log(data.current.wind_speed)
    });
})