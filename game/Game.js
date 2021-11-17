import _ from 'underscore'
import { possibleScore } from './util'
import { bruteForce, intelligent } from './pangram'

module.exports = {
    genDummy,
    genBrute,
    Game
}

function genDummy() {
    return new Game({ 
        letters: ['e','r','o','l','k','n','i'], 
        keyLetter: 'l', 
        answers: { lore: true, kill: true, roll: true, role: true, iller: true, roil: true }
    })
}

function genBrute() {
    const { letters, keyLetter, answers } = bruteForce({ doNotVet: true })
    return new Game({ letters, keyLetter, answers })
}

function Game({ letters, keyLetter, answers }) {
    const self = this
    self.letters = letters
    self.keyLetter = keyLetter
    self.answers = answers

    self.getLetters = function() {
        let letters = self.letters.map(l => l.toUpperCase())
        letters.splice(letters.indexOf(self.keyLetter.toUpperCase()), 1)
        return letters.map(l => l.toUpperCase())
    }

    self.getKeyLetter = function() {
        return self.keyLetter.toUpperCase()
    }

    self.getAllLetters = function() {
        return self.letters.map(l => ({
            text: l.toUpperCase(),
            isKey: l === self.keyLetter
        }))
    }

    self.submit = function(submission) {
        let grade = 0

        if (self.answers[submission.toLowerCase()]) {
            grade = submission.length < 5 ? 1 : submission.length
        }

        return grade
    }

    self.possibleScore = function() {
        return possibleScore(self.answers)
    }

    self.shuffle = function() {
        self.letters = _.shuffle(self.letters)
    }

    self.numberOfAnswers = function() {
        return Object.keys(self.answers).length
    }
}