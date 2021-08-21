import { getCityInfo, getHourlyWeatherData } from "./forecast/modules.js"

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