import inquirer from 'inquirer'
import _ from 'underscore'
import { Game } from './game.mjs'

const game = await Game.createNewGame()
let score = 0
const alreadyFound = {}

let quit = false

async function prompt() {

    if (!quit) {

        let input = await inquirer.prompt([{
            name: 'word',
            message: formatPrompt()
        }])

        switch (input.word) {

            case 'q':
                quit = true
                break

            case '@':
                game.shuffle()
                break

            default:
                if (alreadyFound[input.word]) {
                    console.log('Already found')
                    break
                }

                const points = game.submit(input.word)
                if (points > 0) {
                    score += points
                    alreadyFound[input.word] = true
                    console.log(`+${points}`)
                } else {
                    console.log('Not in word list')
                }

                console.log(`Your score is ${score}`)
        }

        return prompt()
    }
}

function formatPrompt() {
    let letters = game.getAllLetters()
    const keyLetter = _.findWhere(letters, { isKey: true })
    letters = letters.filter(l => !l.isKey)
    return `
           ${letters[0].text}
        ${letters[1].text}     ${letters[2].text}
           ${keyLetter.text}
        ${letters[3].text}     ${letters[4].text}
           ${letters[5].text}
    ` + '\n'
}

prompt().then(() => {
    console.log(`
        You scored ${score} points out of
        ${game.maximumScore} possible points
        There were ${game.numberOfAnswers()} answers
        Pangram was ${game.pangrams}
    `)
    process.exit(0)
})
