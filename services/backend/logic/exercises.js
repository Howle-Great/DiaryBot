const warmup = [
  {
    description: `- Разминка - ${this.params[0]} минут`,
    params: { 
      time: [{
        time: 4, 
        deltaGeneration: 1
      }]
    }
  }
]

const exercises = [
  {
    id: 0,
    description: `
         - Подтягивания на турнике:
          Широким хватом (х${this.params[0]})
          Узким хватом (х${this.params[1]})
    `,
    params: {
      description: [
        {
          time: 6, 
          deltaGeneration: 1
        },
        6
      ], 
      time: [{
        time: 15, 
        deltaGeneration: 2
      }]
    }
  }
]

let exercises = {}

function generateFakeExerciseTime(time, deltaGeneration = 4) {
  const generatorTime = () => {Math.floor(Math.random() * ((time + deltaGeneration) - (time - deltaGeneration))) + (time - deltaGeneration)}
  let exerciseTime = generatorTime()
  if (exerciseTime < 3) {
    exerciseTime = 3
  }
  return exerciseTime
}


exercises.give = (props) => {
  let {exerciseId, exerciseParams, exerciseTimeParams, warmupId, warmupTimeParams} = {props}
  let exercise = Object.assign(this.exercises.find((elem) => elem.id == exerciseId))
  let warmup = Object.assign(this.warmup.find((elem) => elem.id == warmupId))
  if (exercise == null || warmup == null) {
    return null
  }
  if (exerciseParams == null) {
    exerciseParams = generateParams(exercise.params.description)
  }
  if (exerciseTimeParams == null) {
    exerciseTimeParams = generatorParams(exercise.params.time)
  }
  if (warmupTimeParams == null) {
    warmupTimeParams = generatorParams(warmup.params.time)
  }

  return {
    warmupText: this.parse(warmup.description, warmupTimeParams),
    descriptionText: this.parse(exercise.description, exerciseParams),
    time: warmupTimeParams + exerciseTimeParams,
  }
}

exercises.generate = (props) => {
  let {exerciseId, warmupId} = {props}
  let exercise = Object.assign(this.exercises.find((elem) => elem.id == exerciseId))
  let warmup = Object.assign(this.warmup.find((elem) => elem.id == warmupId))
  if (exercise == null || warmup == null) {
    return null
  }
  let exerciseParams = generateParams(exercise.params.description)
  let exerciseTimeParams = generatorParams(exercise.params.time)
  let warmupTimeParams = generatorParams(warmup.params.time)

  return {
    exercise_id: exerciseId,
    exercise_params: exerciseParams,
    exercise_time_params: exerciseTimeParams,
    warnup_id: warmupId,
    warnup_time_params: warmupTimeParams,
    time: exerciseTimeParams + warmupTimeParams,
  }
}

function parse(pattern, params) {
  return pattern
}

function generateParams(pattern) {
  const generatorParams = (arr) => arr.filter(elem => {
    if (typeof(elem) == 'number') {
      return generateFakeExerciseTime(elem)
    } else {
      return generateFakeExerciseTime(elem.time, elem.deltaGeneration)
    }
  });
  return generatorParams(pattern)
}

