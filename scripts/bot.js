import { model } from './model.js'
import { smoothScroll } from './utils.js'

export class Bot {
    constructor(element, answers) {
        this.element = element
        this.answers = answers
    }
    
    init() {
        this.element.insertAdjacentHTML('beforeend', model)
        const answers = this.answers
        const botBtn = document.querySelector('.bot__btn')
        const botWindow = document.querySelector('.bot__body')
        const botCloseBtn = document.querySelector('.bot__close')
        const botForm = document.querySelector('.bot__form')
        const botInput = document.querySelector('.bot__text')
        const botSubmitBtn = document.querySelector('.bot__submit')
        const botMessagesWindow = document.querySelector('.bot__messages')
        let savedMessages 

        if(!localStorage.user_messages) {
            savedMessages = []
        } else {
            savedMessages = JSON.parse(localStorage.user_messages)
	    }

        function saveMessage(message) {
            savedMessages.push(message)
            localStorage.user_messages = JSON.stringify(savedMessages)
        }

        botMessagesWindow.insertAdjacentHTML('beforeend', `
            ${createBotMessage(answers.start)}
            <div class="bot__bot-message-btn-area">
                ${createBotBtn('привет')}
                ${createBotBtn('как дела?')}
                ${createBotBtn('пока')}
            </div>
        `)

        let botMessageBtns = document.querySelectorAll('.bot__bot-message-btn')
        botMessageBtns.forEach(element => element.addEventListener('click', sendBtnText))

        function sendBtnText(event) {
            event.preventDefault()
            let botText = this.textContent
            saveMessage(botText)
            botMessagesWindow.insertAdjacentHTML('beforeend', createBotMessage(botText))
            smoothScroll(botMessagesWindow)
            setTimeout(() => {
                botAnswer(botText)
                smoothScroll(botMessagesWindow)
            }, 1000)
        }

        savedMessages.forEach(message => {
            botMessagesWindow.insertAdjacentHTML('beforeend', createBotMessage(message))
            botAnswer(message)
        })

        botInput.addEventListener('keyup', () => {
            if (botInput.value) {
                botSubmitBtn.classList.add('bot__submit_visible')
            } else {
                botSubmitBtn.classList.remove('bot__submit_visible')
            }
        })

        function chatBot(event) {
            event.preventDefault()
            botWindow.classList.toggle('bot__body_active')
            botBtn.classList.toggle('bot__btn_inactive')
        }

        botBtn.addEventListener('click', chatBot)
        botCloseBtn.addEventListener('click', chatBot)

        function createBotMessage(text) {
            return `<p class="bot__bot-message">${text}</p>`
        }

        function createUserMessage(text) {
            return `<p class="bot__user-message">${text}</p>`
        }

        function createBotBtn(text) {
            return `<button class="bot__bot-message-btn">${text}</button>`
        }

        botForm.addEventListener('submit', event => {
            event.preventDefault()
            let userText = botForm.children[0].value
            saveMessage(userText)
            botMessagesWindow.insertAdjacentHTML('beforeend', createUserMessage(userText))
            smoothScroll(botMessagesWindow)
            botForm.children[0].value = ''
            setTimeout(() => {
                botAnswer(userText)
                smoothScroll(botMessagesWindow)
            }, 1000)
        })

        function botAnswer(userText) {
            if (userText.toLowerCase() === 'привет' || userText.toLowerCase() === 'здравствуйте') {
                let botText = answers.hello
                botMessagesWindow.insertAdjacentHTML('beforeend', createBotMessage(botText))
            } else if (userText.toLowerCase() === 'пока') {
                let botText = answers.bye
                botMessagesWindow.insertAdjacentHTML('beforeend', createBotMessage(botText))
            } else if (userText.toLowerCase() === 'как дела?' || userText.toLowerCase() === 'как дела') {
                let botText = answers.dealQuestion
                botMessagesWindow.insertAdjacentHTML('beforeend', createBotMessage(botText))
            } else {
                let botText = answers.undefined
                botMessagesWindow.insertAdjacentHTML('beforeend', createBotMessage(botText))
            }
        }
    }
}