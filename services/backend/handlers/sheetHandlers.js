const Exercise = require('../models/exercise.modal')
const UsersDiary = require('../models/usersDiary.model')
const UsersSheets = require('../models/usersSheets.model')
const Warmup = require('../models/warmup.model')

const generator = require('../logic/sheetGenerator')

let handlers = {}

handlers.takeSheet = (req, res) => {
  const userId = req.body.userId
  const day1 = req.body.day1
  const day2 = req.body.day2

  const userSheet = new UsersSheets({
    user_id: userId,
    day1: day1,
    day2: day2,
  })

  userSheet.save()
    .then(() => {
      let promise = new Promise((resolve, reject) => {
        resolve(generator.generatorSheet(userId, day1, day2))      
      });
      promise.then((result) => {
        const userDiary = new UsersDiary(result)
        userDiary.save()
          .then(() => {
            res.json('User sheet successfully added!')
          }).catch((err) => {
            res.status(400).json('Error sheet ' + err)
          })
      }).catch(err => res.status(400).json('Error save UsersDiary: ' + err))
    })
    .catch(err => res.status(400).json('Error ' + err))
}

handlers.giveSheet = (req, res) => {
  const id = req.params.id

  
  
}

module.exports = handlers