const dateNow = new Date()
const month =
    dateNow.getMonth() + 1 < 10 ? `0${dateNow.getMonth() + 1}` : `${dateNow.getMonth() + 1}`
const day = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : `${dateNow.getDate()}`
export const profileDate = `${dateNow.getFullYear()}-${month}-${day}`
