const express = require('express')
const bodyParser = require('body-parser')
const Vkbot = require('node-vk-bot-api')

const app = express()
const bot = new Vkbot ({
  token: process.env.TOKEN,
  confirmation: process.env.CONFIRMATION
})

bot.command('/start', (ctx) => {
  ctx.reply(`I'm in`)
})

app.use(bodyParser.json())

app.post('/', bot.webhookCallback)

app.listen(80)