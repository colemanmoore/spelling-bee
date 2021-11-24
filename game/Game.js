import _ from 'underscore'
import { possibleScore } from './util.js'

export default class Game {

    constructor({ letters, keyLetter, answers }) {
        this.letters = letters.map(l => l.toLowerCase())
        this.keyLetter = keyLetter.toLowerCase()
        this.answers = answers
    }

    getLetters() {
        let letters = this.letters
        letters.splice(letters.indexOf(this.keyLetter), 1)
        return letters
    }

    getKeyLetter() {
        return this.keyLetter
    }

    getAllLetters() {
        return this.letters.map(l => ({
            text: l,
            isKey: l === this.keyLetter
        }))
    }

    submit(submission) {
        if (this.answers[submission.toLowerCase()]) {
            return submission.length < 5 ? 1 : submission.length
        }

        return 0
    }

    possibleScore() {
        return possibleScore(this.answers)
    }

    shuffle() {
        this.letters = _.shuffle(this.letters)
    }

    numberOfAnswers() {
        return Object.keys(this.answers).length
    }
}
