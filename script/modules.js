import { transformHours, transformWeekday } from "./auxFunctions.js"
/* Funcion encargada de realizar Geocoding de la ciudad ingresada por el usuario */
            /* Ademas guarda el nombre de la ciudad y la provincia */
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

/* Funcion encargada de obtener datos climaticos dada una hora y crear el Array con*/
                /*  los objetos HTML donde se renderizaran esos datos */
export const getHourlyWeatherData = (lat, lon, h) =>{
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
                let val = [
                    data.hourly[h].weather[0].icon,
                    data.hourly[h].weather[0].description,
                    transformWeekday(data.hourly[h].dt),
                    transformHours(data.hourly[h].dt),
                    Math.trunc(data.hourly[h].temp),
                    data.hourly[h].humidity,
                    Math.trunc(data.hourly[h].wind_speed),
                    data.hourly[h].pop,
                ]
                /* Objetos HTML donde se renderizan los datos */
                let obj = [
                    document.querySelector('#currentIcon'),
                    document.querySelector('#currentDescription'),
                    document.querySelector('#currentWeekday'),
                    document.querySelector('#currentTime'),
                    document.querySelector('#currentTemp'),
                    document.querySelector('#currentHumidity'),
                    document.querySelector('#currentWind'),
                    document.querySelector('#currentPop'),
                ]
                /* Llamada a la funcion encargada de renderizar */                
                renderHourlyData(val, obj)
            })      
        )
    })
}

export const renderHourlyData = (val, obj) =>{
    obj.forEach((element,i) => {
        if(element.getAttribute('alt') == 'Weather icons'){
            element.setAttribute('src', `http://openweathermap.org/img/wn/${val[i]}@2x.png`)
        }else{
            element.innerHTML = `${val[i]}`
        }
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
                await getHourlyWeatherData(localStorage.getItem('lat'),localStorage.getItem('lon'), 0)
            }catch(error){
                console.log(error)
            }
        }
    })
}