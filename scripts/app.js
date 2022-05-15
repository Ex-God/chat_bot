import { Bot } from './bot.js'

const page = document.querySelector('.page')

fetch('/chat_bot/data/answers.json').then(response => response.json()).then(json => {
    const answers = json
    const bot = new Bot(page, answers)
    bot.init()
})