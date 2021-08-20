export const getCityInfo = async () => {
    return new Promise((resolve) => {
        const city = document.querySelector('#search-input').value
        
        const params = {
            access_key: 'woc8qRJMqbhaEYmNHS8wF2LD8uxemOTW6Bru5-TjfgM',
            query: `${city}`,
            language: 'es',
        }
        resolve(
            fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${params.query}&gen=9&apiKey=${params.access_key}&language=${params.language}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('lat', data.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
                localStorage.setItem('lon', data.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
                localStorage.setItem('city', data.Response.View[0].Result[0].Location.Address.City);
                localStorage.setItem('province', data.Response.View[0].Result[0].Location.Address.State);
            })
        )
    })
}

export const getWeatherData = (lat, lon) =>{
    return new Promise((resolve)=>{        
        const params = {
            access_key: '4c72c6754e67da7ee09dff08dd713e81',
            lat: `${lat}`,
            lon: `${lon}`,
            exclude: 'alerts,minutely,current',
            lang: 'es',
            units: 'metric'
        }
        resolve(
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&exclude=${params.exclude}&appid=${params.access_key}&units=${params.units}&lang=${params.lang}`)
            .then(response => response.json())
            .then(data => {
                /* Datos del clima actual */
                console.log(data.hourly[0])

                console.log(data.hourly[0].weather[0].icon)  
                console.log(data.hourly[0].weather[0].description)
                console.log(data.hourly[0].dt)  
                console.log(data.hourly[0].temp)  
                console.log(data.hourly[0].humidity)  
                console.log(data.hourly[0].wind_speed)  
                console.log(data.hourly[0].pop)   
            })
        )
    })
}

export const eventSearchForm = () =>{
    const searchForm = document.querySelector('#search-form')

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        if(window.location.pathname == '/index.html'){
            try{
                await getCityInfo()
                window.open("../views/forecast.html","_self")
            }catch(error){
                console.log(error)
            }
            
        }else{
            try{
                await getCityInfo()
                await getWeatherData(localStorage.getItem('lat'),localStorage.getItem('lon'))
            }catch(error){
                console.log(error)
            }
        }
    })
}