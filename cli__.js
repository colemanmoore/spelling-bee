import inquirer from 'inquirer'
import SpellingBee from './game/Game.js'
import Player from './public/javascripts/Player.js'

const bee = new SpellingBee()
const player = new Player({
    letters: bee.getLetters(),
    keyLetter: bee.getKeyLetter()
})

let quit = false

async function play() {

    if (!quit) {

        const status = player.status()

        if (status.score) {
            console.log(`Your score is ${status.score}`)
        }

    const message = `
       ${status.letters[0]}
    ${status.letters[1]}     ${status.letters[2]}
       ${bee.getKeyLetter()}
    ${status.letters[3]}     ${status.letters[4]}
       ${status.letters[5]}
    ` + '\n'

        let input = await inquirer.prompt([{
            name: 'word',
            message
        }])

        switch (input.word) {

            case 'q':
                quit = true
                break

            case '@':
                bee.shuffle()
                break

            default:
                const points = bee.submit(input.word)

                if (status.found[input.word]) {
                    console.log(bee.messages.ALREADY_FOUND)

                } else if (points > 0) {
                    player.addToList(input.word)
                    player.increaseScore(points)
                    console.log(`+${points}`)

                } else {
                    console.log(bee.messages.NOT_IN_LIST)
                }
        }

        return play()
    }
}

play().then(() => {
    console.log(`
        You scored ${bee.score} points out of
        ${bee.possibleScore()} possible points
        There were
        ${bee.numberOfAnswers()} answers
        Pangram was ${bee.pangram}
    `)
})
