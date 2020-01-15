const newDate = require('./newDate')
const exercises = require('./exercises')

const dayOfBeginStudy = new newDate(2019, 9, 2)

let sheetGenerator = {}

function validateDays(day) {
  return (day >= 0 && day <= 6) ? day : null
}

function generateDays(day1, day2, sinceDate, toDate) {
  const daysGap = day2.getUTCDay() - day1.getUTCDay()
  const dayOfMiddleWeek = 3
  let outDays = []
  while (day1 < toDate && day2 < toDate) {
    
  }
  if (daysGap >= 4) {
    if (day1.nextDay() < toDate) {
      outDays.push(day1.nextDay())
      day1.toNextWeek()
    }
    if (day2.previousDay() < toDate) {
      outDays.push(day2.previousDay())
      day2.toNextWeek()
    }
    // outDays[0] = day1 + 1
    // outDays[1] = day2 - 1
  } else if (daysGap >= 2) {
    if (day1.nextDay() < toDate) {
      outDays.push(day1.nextDay())
      day1.toNextWeek()
    }
    if (day2.nextDay() < toDate) {
      outDays.push(day2.nextDay())
      day2.toNextWeek()
    }
    // outDays[0] = day1 + 1
    // outDays[1] = day2 + 1
  } else if (day1 == 0 || day1 == 1) {
    if (day1.nextDay(2) < toDate) {
      outDays.push(day1.nextDay(2))
      day1.toNextWeek()
    }
    if (day2.nextDay(3) < toDate) {
      outDays.push(day2.nextDay(3))
      day2.toNextWeek()
    }
    // outDays[0] = day2 + 2
    // outDays[1] = day2 + 3
  } else if (day2 == 5 || day2 == 6) {
    if (day1.previousDay(3) < toDate) {
      outDays.push(day1.previousDay(3))
      day1.toNextWeek()
    }
    if (day2.previousDay(2) < toDate) {
      outDays.push(day2.previousDay(2))
      day2.toNextWeek()
    }
    // outDays[0] = day1 - 3
    // outDays[1] = day1 - 2
  } else {
    if (day1.nearestWeekDay(0) < toDate) {
      outDays.push(day1.nearestWeekDay(0))
      day1.toNextWeek()
    }
    if (day2.nearestWeekDay(6) < toDate) {
      outDays.push(day2.nearestWeekDay(6))
      day2.toNextWeek()
    }
    // outDays[0] = 0
    // outDays[1] = 6
  }
  return outDays
}

sheetGenerator.generatorSheet = (userId, day1, day2) => {
  day1 = validateDays(day1)
  day2 = validateDays(day2)
  if (! day1 && day2 || day1 == day2) {
    return null
  }
  if (day1 > day2) {
    [day1, day2] = [day2, day1]
  }
  const datetime = new newDate();
  if (!days) {
    return null
  }
  let generatedSheets = []
  let date1OfWeek = dayOfBeginStudy.nextNearestWeekDay(day1)
  let date2OfWeek = dayOfBeginStudy.nextNearestWeekDay(day2)

  let days = generateDays(date1OfWeek, date2OfWeek, dayOfBeginStudy, datetime)

  let sheets = days.filter((day) => {
    const rand_id = Math.floor(Math.random() * (0 - 0)) + 0
    return exercises.generate({
      exerciseId: rand_id, 
      warmupId: rand_id, 
    })
  })

  days.forEach((elem, index) => {
    generatedSheets.push({
      user_id: userId,
      day: elem.getUTCDay(),
      exercise_id: sheets[index],
      exercise_params: sheets[index],
      exercise_time_params: sheets[index],
      warnup_id: sheets[index],
      warnup_time_params: sheets[index],
      time: sheets[index],
      pulseBefor: Math.floor(Math.random() * (85 - 70)) + 70,
      pulseAfter: Math.floor(Math.random() * (140 - 120)) + 120,
      stateOfHealth: '+',
      wish: '+'
    })
  })

  return 
}

module.exports = sheetGenerator