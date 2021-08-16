export const eventSearchForm = () =>{
    const searchForm = document.querySelector('#search-form')

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        getCityInfo()
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
        console.log(data.data[0].latitude)
        console.log(data.data[0].longitude)
        console.log(data.data[0].name)
        console.log(data.data[0].region)
    });
}