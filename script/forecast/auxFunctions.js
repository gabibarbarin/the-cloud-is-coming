export const transformHours = (date) =>{
    let auxDate = new Date(date*1000)
    return(auxDate.getHours()+':00')
}

export const transformWeekday = (date) =>{
    let auxDate = new Date(date*1000)
    const Weekday = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    return(Weekday[auxDate.getDay()])
}

export const saveData = (cData, dData) => {
    const currentHour = new Date()
    const auxCant = 24 - currentHour.getHours()

    let currentData = []
    let dailyData = []

    for(let i=0; i <= auxCant; i++)
        currentData.push(cData[i])

    for(let i=1; i <= 7; i++)
        dailyData.push(dData[i])

    localStorage.setItem('currentData', JSON.stringify(currentData))
    localStorage.setItem('dailyData', JSON.stringify(dailyData))
}