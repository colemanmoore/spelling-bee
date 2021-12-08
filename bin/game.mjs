import _ from 'underscore'
import { readFromDictionaryFile } from './io.mjs'

const PANGRAM_LENGTH = 7

/**
 * Game class
 */

export class Game {

    constructor({ letters, keyLetter, answers }) {
        const wordsList = readFromDictionaryFile()
        this.letters = letters.map(l => l.toLowerCase())
        this.keyLetter = keyLetter.toLowerCase()
        this.answers = answers || getQualifyingWords({ wordsList, keyLetter, letters })
        this.pangrams = this.getAllPangrams()
        this.maximumScore = possibleScore(this.answers)
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

    getAllPangrams() {
        return Object.keys(this.answers).filter(word => {
            return canBePangram(word)
        })
    }

    submit(submission) {
        if (this.answers[submission.toLowerCase()]) {
            return submission.length < 5 ? 1 : submission.length
        }
        return 0
    }

    shuffle() {
        this.letters = _.shuffle(this.letters)
    }

    numberOfAnswers() {
        return Object.keys(this.answers).length
    }

    toString() {
        return JSON.stringify({
            letters: this.letters,
            keyLetter: this.keyLetter
        })
    }
}

/**
 * Game generation
 */

export function createFromDictionary(wordsList) {

    const pangrams = wordsList.filter(canBePangram)

    const pangram = pangrams[Math.floor(Math.random() * pangrams.length)]

    const letters = uniqueChars(pangram)

    let keyLetter, answers
    const scores = letters.map(l => {
        answers = getQualifyingWords({ wordsList, keyLetter: l, letters })
        return { keyLetter: l, maxScore: possibleScore(answers), answers: Object.keys(answers).length }
    })

    scores.sort((a, b) => a.maxScore - b.maxScore)
    keyLetter = scores[0].keyLetter
    answers = getQualifyingWords({ wordsList, keyLetter, letters })

    console.log(pangram, `Words: ${Object.keys(answers).length} Maximum Points: ${scores[0].maxScore}`)

    return new Game({
        letters,
        keyLetter,
        answers
    })
}

export async function createFromDbResult(gameData) {
    const letterData = await JSON.parse(gameData.letters)
    return new Game({
        letters: letterData.letters,
        keyLetter: letterData.keyLetter
    })
}

/**
 * Helper functions
 */

export function canBePangram(word) {
    if (typeof word !== 'string') return false
    const uniques = uniqueChars(word)
    return uniques.length === PANGRAM_LENGTH
}

export function uniqueChars(word) {
    if (typeof word !== 'string') return []
    const chars = word.split('')
    return chars.filter((value, index, self) =>
        self.indexOf(value) === index)
}

export function getQualifyingWords({ wordsList, keyLetter, letters }) {
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

export function possibleScore(answers) {
    let score = 0
    Object.keys(answers).forEach(ans => {
        score += ans.length < 5 ? 4 : ans.length
    })
    return score
}
