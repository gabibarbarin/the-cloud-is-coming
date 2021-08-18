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
            getCityInfo()
        }
    })
}