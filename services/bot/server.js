"use strict"
const express = require('express')
const bodyParser = require('body-parser')
const VkBot = require('node-vk-bot-api')
const Scene = require('node-vk-bot-api/lib/scene')
const Session = require('node-vk-bot-api/lib/session')
const Stage = require('node-vk-bot-api/lib/stage')
const fetch = require('node-fetch');

const utils = require('./urils')

require('dotenv').config()

const app = express()
const bot = new VkBot ({
  token: process.env.TOKEN,
  confirmation: process.env.CONFIRMATION
})

const session = new Session();
const sceneSkils = new Scene('skils',
  (ctx) => {
    ctx.scene.leave()
    ctx.reply(`📔 Я могу составить за тебя дневник самоподготовки. 
    Просто напиши 'дневник' и дни недели когда у тебя физ-ра.
    `)
  },
)

const stageSceneSkils = new Stage(sceneSkils)
 
bot.use(session.middleware());
bot.use(stageSceneSkils.middleware())

bot.command('что умеешь?', (ctx) => {
  ctx.scene.enter('skils')
})

bot.command('расписание', (ctx) => {
  const text = ctx.message.text
  let dayNumbers = []
  let textArray = text.split(' ').slice(1)
  // console.log(`Type of textArray: ${typeof(textArray)}, Obj: ${textArray}`);
  
  if (textArray.length === 2) {
    const dataRegExp = RegExp(/([0-2][0-9]|(3)[0-1])(-|.)(((0)[0-9])|((1)[0-2]))(-|.)\d{4}/g) // 2000-02-12 or 09-12-2003
    // const dataRegExp = (/((((?:19|20)\d\d)[-|.|\/](0[1-9]|1[012])[-|.|\/](0[1-9]|[12][0-9]|3[01]))|(([0-2][0-9]|(3)[0-1])(-|.|\/)(((0)[0-9])|((1)[0-2]))(-|.|\/)\d{4}))/g)
    const textRegExp = RegExp(/[А-Яа-я( )]/g)
    console.log(textArray)
    if (textArray.every((num) => num.match(dataRegExp) != null)){  // format: 19-02-2020
      textArray.forEach(element => {        
        dayNumbers.push(utils.dateInNumber(element))
      });
    } else if (textArray.every((num) => num.match(textRegExp) != null)){   // format: пн вт
      textArray.forEach(element => {
        dayNumbers.push(utils.weekDayInNumber(element))
      });
    } else {
      ctx.reply(`Извините, но я не знаю таких дней недели или дат 😅`)
    }
    // if (!dayNumbers.some(elem => elem === 1)) {
    //   ctx.reply(`Извините, но я не знаю таких дней недели или дат 😅`)
    // }
  }
  // console.log(`Type of dayNumbers: ${typeof(dayNumbers)}, Obj0: ${dayNumbers[0]}, Obj1: ${dayNumbers[1]}`);

  let response = fetch('http://localhost:3000/sheet', {
      method: 'POST',
      body: JSON.stringify({
        user_id: '12',
        day1: dayNumbers[0],
        day2: dayNumbers[1],
      })
    }).then((res) => {
      return res.json()
    }).then((result) => {
      // console.log(`${result}\n`);
      ctx.reply(`Вы выбрали ${dayNumbers}`)
      console.log(`Ваш массив ${result.mess}`)
    }).catch((err) => {
      console.log(`Have a problem with fetch: ${err}`)
    })
  
})

bot.on((ctx) => {
  const text = ctx.message.text


  ctx.reply(`Прости, но я всего лишь код' и не могу отвечать тебе как человек 😔`)
})

app.use(bodyParser.json())

app.post('/', bot.webhookCallback)

app.listen(80)