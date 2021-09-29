const fs = require('fs')
const _ = require('underscore')
const inquirer = require('inquirer')
const Game = require('./Game')

const words_json = fs.readFileSync('dictionary.json')
const wordsHash = JSON.parse(words_json)
const wordsList = Object.keys(wordsHash)
const game = new Game(wordsList)

let done = false
async function prompt() {
    while (!done) {
        let response = await inquirer.prompt([
            {
                name: 'word',
                message: `${game.letters} ~~~ key is ${game.keyLetter}`
            }
        ])

        if (response.word === '$$$') { // TODO better escape hatch
            done = true
            return
        }

        if (game.submit(response.word)) {
            console.log('correct!')
        } else {
            console.log('wrong!')
        }
        console.log(`Your score is ${game.score}`)

        return prompt()
    }
}
prompt()

