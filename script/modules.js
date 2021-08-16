export const eventSearchForm = () =>{
    const searchForm = document.querySelector('#search-form')

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()

        //window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200")
        window.location.pathname == '/index.html' ? (window.open("../views/forecast.html"),getCityInfo()) : getCityInfo()
        //console.log(window.location.pathname) 
    })
}


export const getCityInfo = () => {
    const city = document.querySelector('#search-input').value

    const params = {
        access_key: '69e1f5b31b492cb5aedf0d78d90dff9f',
        query: `${city}`,
    }
    
    fetch(`http://api.positionstack.com/v1/forward?access_key=${params.access_key}&query=${params.query}`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('lat', data.data[0].latitude);
        localStorage.setItem('lon', data.data[0].longitude);
        localStorage.setItem('city', data.data[0].name);
        localStorage.setItem('province', data.data[0].region);
    });
}