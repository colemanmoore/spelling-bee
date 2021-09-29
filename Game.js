const _ = require('underscore')

module.exports = function Game(wordsList) {
    const self = this

    const pangram = choosePangram()
    self.letters = _.shuffle(uniqueChars(pangram))
    self.keyLetter = self.letters[0]
    self.answers = getQualifyingWords()
    self.score = 0

    this.submit = function(submission) {
        const grade = gradeSubmission(submission)
        this.score += grade
        return grade > 0
    }

    function choosePangram() {
        const pangrams = wordsList.filter(canBePangram)
        return pangrams[Math.floor(Math.random() * pangrams.length)]
    }

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

    function getQualifyingWords() {
        let answers = {}
        wordsList.forEach(word => {
            const uniques = uniqueChars(word)
            if (
                !_.contains(uniques, self.keyLetter) ||
                _.without(uniques, ...self.letters).length > 0
            ) return

            answers[word] = 1
        })
        return answers
    }

    function gradeSubmission(submission) {
        if (self.answers[submission]) {
            return 1 // TODO more specific
        } else {
            return 0
        }
    }
}