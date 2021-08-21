import { saveData, transformHours, transformWeekday } from "./auxFunctions.js"
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
                localStorage.setItem('lat', data.Response.View[0].Result[0].Location.DisplayPosition.Latitude)
                localStorage.setItem('lon', data.Response.View[0].Result[0].Location.DisplayPosition.Longitude)
                localStorage.setItem('city', data.Response.View[0].Result[0].Location.Address.City)
                localStorage.setItem('province', data.Response.View[0].Result[0].Location.Address.State)
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
                /* Guardamos los datos climaticos del dia para usarlos luego */
                saveData(data.hourly)
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

/* Funcion encargada de renderizar los datos del primer parametro(Array) en las ubicaciones */
                /*  que se indican en el segundo parametro(Array) */
export const renderHourlyData = (val, obj) =>{
    obj.forEach((element,i) => {
        if(element.getAttribute('alt') == 'Weather icons'){
            element.setAttribute('src', `http://openweathermap.org/img/wn/${val[i]}@2x.png`)
        }else{
            element.innerHTML = `${val[i]}`
        }
    })   
}

/* Funcion encargada de controlar el inputRange y llamar a la funcion que renderiza */
                        /*  cuando este cambia su valor */
export const eventInputRange = () => {
    const hour = new Date()
    const data = JSON.parse(localStorage.getItem('data'))

    /* Seteado del inputRange */
    const inputRange = document.querySelector('#inputRange')
    inputRange.value = hour.getHours()
    inputRange.min = hour.getHours()

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

    inputRange.oninput = () =>{
        /* Posicion en el Array Data de la nueva hora */
        const newHour = inputRange.value - inputRange.min
        
        /* Datos del clima actual */
        let val = [
            data[newHour].weather[0].icon,
            data[newHour].weather[0].description,
            transformWeekday(data[newHour].dt),
            transformHours(data[newHour].dt),
            Math.trunc(data[newHour].temp),
            data[newHour].humidity,
            Math.trunc(data[newHour].wind_speed),
            data[newHour].pop,
        ]
        /* Llamada a la funcion encargada de renderizar */                
        renderHourlyData(val, obj)
    }    
}