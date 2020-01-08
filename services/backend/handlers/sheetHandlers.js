const Exercise = require('../models/exercise.modal')
const UsersDiary = require('../models/usersDiary.model')
const UsersSheets = require('../models/usersSheets.model')
const Warmup = require('../models/warmup.model')

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
}

handlers.giveSheet = (req, res) => {
  
}

module.exports = handlers