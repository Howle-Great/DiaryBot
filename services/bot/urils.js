const calendar = require('node-calendar')
let utils = {}

utils.weekDayInNumber = (str) => {
  str = str.toLowerCase()
  const weekDays = {
    0: ['пн'],
    1: ['вт'],
    2: ['ср'],
    3: ['чт', 'чет'],
    4: ['пт', 'пят'],
    5: ['сб', 'субб'],
    6: ['вс', 'вос']
  }
  rightArrayDay = Object.values(weekDays).filter((elem) => elem.some((reg) => str.includes(reg)))
  console.log(`rightArrayDay: ${rightArrayDay}\n`)
  return Object.values(weekDays).indexOf(rightArrayDay)
}

utils.dateInNumber = (date) => {
  let dataArray = date.includes('.') ? date.split('.') : date.split('-')
  let numDate = calendar.weekday(...dataArray)
  return numDate <= 3 ? numDate + 3 : numDate - 3 // fix bug in calendar tue = 0, sat = 3 => tue = 3, sat = 6
}

module.exports = utils