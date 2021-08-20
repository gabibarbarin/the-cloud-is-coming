export const transformHours = (date) =>{
    let auxDate = new Date(date*1000)
    return(auxDate.getHours()+':00')
}

export const transformWeekday = (date) =>{
    let auxDate = new Date(date*1000)
    const Weekday = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    return(Weekday[auxDate.getDay()])
}