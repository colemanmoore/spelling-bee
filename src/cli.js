const fs = require('fs')
const inquirer = require('inquirer')
const Game = require('./Game')

const words_json = fs.readFileSync('dictionary.json')
const wordsList = Object.keys(JSON.parse(words_json))
const game = new Game(wordsList)

let quit = false

async function prompt() {

    if (!quit) {

        let input = await inquirer.prompt([{
            name: 'word',
            message: game.prompt()
        }])

        switch (input.word) {

            case 'q':
                quit = true
                break

            case '@':
                game.shuffle()
                break

            default:
                const response = game.submit(input.word)
                if (response.points > 0) {
                    console.log(`+${response.points}`)
                } else {
                    console.log(response.message)
                }
                console.log(`Your score is ${response.totalScore}`)
        }

        return prompt()
    }
}

prompt().then(() => {
    console.log(`
        You scored ${game.score} points out of
        ${game.possibleScore()} possible points
        There were
        ${game.numberOfAnswers()} answers
        Pangram was ${game.pangram}
    `)
})
