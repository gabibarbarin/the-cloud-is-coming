export const transformHours = (date) =>{
    let auxDate = new Date(date*1000)
    return(auxDate.getHours()+':00')
}

export const transformWeekday = (date) =>{
    let auxDate = new Date(date*1000)
    const Weekday = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    return(Weekday[auxDate.getDay()])
}

export const saveData = (data) => {
    const currentHour = new Date()
    const auxCant = 24 - currentHour.getHours()

    let arrayAux = []

    for(let i=0; i <= auxCant; i++)
        arrayAux.push(data[i])

    localStorage.setItem('data', JSON.stringify(arrayAux))
}