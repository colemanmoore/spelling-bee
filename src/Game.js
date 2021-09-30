const _ = require('underscore')

module.exports = function Game(wordsList, doNotVet) {
    const self = this

    const MIN_POINTS = 150
    const MAX_POINTS = 350
    const text = {
        ALREADY_FOUND: 'Already found',
        NOT_IN_LIST: 'Not in word list'
    }

    self.found = {}
    self.score = 0

    const pangrams = wordsList.filter(canBePangram)
    let lowScoring = false
    let initializations = 0
    do {
        initializations++
        self.pangram = pangrams[Math.floor(Math.random() * pangrams.length)]
        self.letters = uniqueChars(self.pangram)
        self.keyLetter = self.letters[Math.floor(Math.random()*self.letters.length)]
        self.answers = getQualifyingWords(self.keyLetter, self.letters)

        if (MIN_POINTS < possibleScore() && possibleScore() < MAX_POINTS) {
            lowScoring = true
        }
    } while (!lowScoring && !doNotVet && initializations < 100000)

    if (!lowScoring && !doNotVet) console.warn('Never found good pangram')

    shuffle()

    self.prompt = function() {
        const letters = self.letters.map(l => l.toUpperCase())
        letters.splice(letters.indexOf(self.keyLetter.toUpperCase()), 1)
        return `
               ${letters[0]}
            ${letters[1]}     ${letters[2]}
               ${self.keyLetter.toUpperCase()}
            ${letters[3]}     ${letters[4]}
               ${letters[5]}
        ` + '\n'
    }

    self.submit = function(submission) {
        let grade = 0
        let message

        if (self.found[submission]) {
            message = text.ALREADY_FOUND

        } else if (self.answers[submission]) {
            grade = submission.length < 5 ? 1 : submission.length
            self.found[submission] = 1
            self.score += grade

        } else {
            message = text.NOT_IN_LIST
        }

        return {
            points: grade,
            totalScore: self.score,
            message
        }
    }

    self.possibleScore = possibleScore
    self.shuffle = shuffle
    self.numberOfAnswers = numberOfAnswers

    function canBePangram(word) {
        if (typeof word !== 'string') return false
        const uniques = uniqueChars(word)
        return uniques.length === 7
    }

    function uniqueChars(word) {
        const chars = word.split('')
        return chars.filter((value, index, self) =>
            self.indexOf(value) === index)
    }

    function getQualifyingWords(keyLetter, letters) {
        let answers = {}
        wordsList.forEach(word => {
            const uniques = uniqueChars(word)
            if (
                !_.contains(uniques, keyLetter) ||
                _.without(uniques, ...letters).length > 0
            ) return

            answers[word] = 1
        })
        return answers
    }

    function possibleScore() {
        let score = 0
        Object.keys(self.answers).forEach(ans => {
            score += ans.length < 5 ? 4 : ans.length
        })
        return score
    }

    function numberOfAnswers() {
        return Object.keys(self.answers).length
    }

    function shuffle() {
        self.letters = _.shuffle(self.letters)
    }
}