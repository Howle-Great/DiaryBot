const router = require('express').Router()

const handlers = require('../handlers/sheetHandlers')

router.route('/').post(handlers.takeSheet)
router.route('/:id').get(handlers.giveSheet)

module.exports = router