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

// module.exports = { Game }

// export function Game({ letters, keyLetter, answers }) {
//     const self = this
//     self.letters = letters
//     self.keyLetter = keyLetter
//     self.answers = answers

//     self.getLetters = function() {
//         let letters = self.letters.map(l => l.toUpperCase())
//         letters.splice(letters.indexOf(self.keyLetter.toUpperCase()), 1)
//         return letters.map(l => l.toUpperCase())
//     }

//     self.getKeyLetter = function() {
//         return self.keyLetter.toUpperCase()
//     }

//     self.getAllLetters = function() {
//         return self.letters.map(l => ({
//             text: l.toUpperCase(),
//             isKey: l === self.keyLetter
//         }))
//     }

//     self.submit = function(submission) {
//         let grade = 0

//         if (self.answers[submission.toLowerCase()]) {
//             grade = submission.length < 5 ? 1 : submission.length
//         }

//         return grade
//     }

//     self.possibleScore = function() {
//         return possibleScore(self.answers)
//     }

//     self.shuffle = function() {
//         self.letters = _.shuffle(self.letters)
//     }

//     self.numberOfAnswers = function() {
//         return Object.keys(self.answers).length
//     }
// }