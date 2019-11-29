const moment = require("moment")
const momenttz = require("moment-timezone")
const timeZone = "Asia/Calcutta"

console.log("This is time format")
console.log(moment.utc().format())

let now = () => {
    
    return moment.utc().format()

}

let getLocalTime = () => {
    return moment().tz(timeZone).format()
}

let convertLocalTime = () => {
    return momenttz.tz(time,timeZone).format("LLLL")

}
console.log(now)

module.exports = {
    now:now,
    getLocalTime:getLocalTime,
    convertLocalTime:convertLocalTime
}