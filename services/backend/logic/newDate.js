module.exports = class newDate extends Date {
  toNextDay(days = 1) {
    this.setTime(this.getTime() + days * 1000*60*60*24)
  }

  nextDay(days = 1) {
    newDate(this.getTime() + days * 1000*60*60*24)
  }

  toPreviousDay(days = 1) {
    this.setTime(this.getTime() - days * 1000*60*60*24)
  }

  previousDay(days = 1) {
    newDate(this.getTime() - days * 1000*60*60*24)
  }

  toNextWeek(weeks = 1) {
    this.setTime(this.getTime() + weeks * 1000*60*60*24*7)
  }

  nextWeek(weeks = 1) {
    newDate(this.getTime() + weeks * 1000*60*60*24*7)
  }

  toPreviousWeek(weeks = 1) {
    this.setTime(this.getTime() - weeks * 1000*60*60*24*7)
  }

  previousWeek(weeks = 1) {
    newDate(this.getTime() - weeks * 1000*60*60*24*7)
  }

  nextNearestWeekDay(weekDay) {
    return this.getUTCDay() < weekDay ?
    newDate(this.getTime() + (weekDay - this.getUTCDay()) * (1 * 1000*60*60*24)) :
    newDate(this.getTime() + (7 * 1000*60*60*24) - (dayOfBeginStudy.getUTCDay() - weekDay) * (1 * 1000*60*60*24))
  }

  nearestWeekDay(weekDay) {
    return newDate(this.getTime() + (weekDay - this.getUTCDay()) * (1 * 1000*60*60*24))
  }
  
}