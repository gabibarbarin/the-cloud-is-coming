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
export const getWeatherData = (lat, lon, h) =>{
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
                saveData(data.hourly, data.daily)
                firstRender()
            })      
        )
    })
}
export const firstRender = () =>{
    const currentData = JSON.parse(localStorage.getItem('currentData'))

    /* Datos del clima actual */
    let val = [
        currentData[0].weather[0].icon,
        currentData[0].weather[0].description,
        transformWeekday(currentData[0].dt),
        transformHours(currentData[0].dt),
        Math.trunc(currentData[0].temp),
        currentData[0].humidity,
        Math.trunc(currentData[0].wind_speed),
        currentData[0].pop,
    ]

    /* Llamada a la funcion encargada de renderizar */                
    renderData(val)
    renderFixedData()
}

/* Funcion encargada de renderizar los datos que cambian según la hora */
export const renderData = (val) =>{
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
    obj.forEach((element,i) => {
        if(element.getAttribute('alt') == 'Weather icons'){
            element.setAttribute('src', `http://openweathermap.org/img/wn/${val[i]}@2x.png`)
        }else{
            element.innerHTML = `${val[i]}`
        }
    })   
}

/* Funcion encargada de renderizar los datos que no cambian luego de la busqueda */
export const renderFixedData = () =>{
    const dailyData = JSON.parse(localStorage.getItem('dailyData'))
    
    const cityProvince = document.querySelector('#cityProvince')
    cityProvince.innerHTML = `${localStorage.getItem('city')}, ${localStorage.getItem('province')}`

    document.querySelector('.future-climate-container').innerHTML = ''
    for(let i = 0; i<=6; i++){
        document.querySelector('.future-climate-container').innerHTML += `
        <div class="inner-container-fc flex-column">
            <span class="future-day">${transformWeekday(dailyData[i].dt).toUpperCase()}</span>
            <img class="future-icon" src="http://openweathermap.org/img/wn/${dailyData[i].weather[0].icon}@2x.png" alt="Weather icons">
            <span class="future-max">${Math.trunc(dailyData[i].temp.max)}°.</span>
            <span class="future-min">${Math.trunc(dailyData[i].temp.min)}°.</span>
        </div>
        `
    }
}

/* Funcion encargada de controlar el inputRange y llamar a la funcion que renderiza */
                        /*  cuando este cambia su valor */
export const eventInputRange = () => {
    const hour = new Date()
    const data = JSON.parse(localStorage.getItem('currentData'))

    /* Seteado del inputRange */
    const inputRange = document.querySelector('#inputRange')
    inputRange.value = hour.getHours()
    inputRange.min = hour.getHours()

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
        renderData(val)
    }    
}