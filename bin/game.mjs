import _ from 'underscore'
import { saveGame, getLatestGame, getAllWordsFromDictionary } from './database.mjs'
import { readFromDictionaryFile } from './io.mjs'

const PANGRAM_LENGTH = 7

/**
 * Game class
 */
export class Game {

    #dictionary
    #answers

    constructor({ id, letters, keyLetter, dictionary }) {

        if (!letters || !keyLetter || !dictionary) {
            throw 'Must pass letters, keyLetter and dictionary to constructor'
        }

        this.id = id
        this.letters = letters.map(l => l.toLowerCase())
        this.keyLetter = keyLetter.toLowerCase()

        this.#dictionary = dictionary
        this.#answers = this.getQualifyingWords()

        this.pangrams = this.getAllPangrams()
        this.maximumScore = possibleScore(this.#answers)
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
        return Object.keys(this.#answers).filter(word => {
            return canBePangram(word)
        })
    }

    getQualifyingWords() {
        if (this.#answers) {
            return this.#answers
        }

        let answers = {}
        const keyLetter = this.keyLetter
        const letters = this.letters
        this.#dictionary.forEach(word => {
            const uniques = uniqueChars(word)
            if (
                !_.contains(uniques, keyLetter) ||
                _.without(uniques, ...letters).length > 0
            ) return

            answers[word] = 1
        })
        return answers
    }

    submit(submission) {
        if (this.#answers[submission.toLowerCase()]) {
            return submission.length < 5 ? 1 : submission.length
        }
        return 0
    }

    shuffle() {
        this.letters = _.shuffle(this.letters)
    }

    numberOfAnswers() {
        return Object.keys(this.#answers).length
    }

    toString() {
        return JSON.stringify({
            letters: this.letters,
            keyLetter: this.keyLetter
        })
    }

    save() {
        return saveGame(this)
    }

    static async createNewGame() {
        const dictionary = readFromDictionaryFile()
        // const dictionary = await getAllWordsFromDictionary()
        const pangrams = dictionary.filter(canBePangram)

        if (!pangrams.length) {
            console.warn('No pangrams in the current dictionary!')
            return // ??
        }

        const pangram = pangrams[Math.floor(Math.random() * pangrams.length)]
        const letters = uniqueChars(pangram)

        const possibleGames = letters.map(l => new Game({ letters, keyLetter: l, dictionary }))
        possibleGames.sort((a, b) => a.maximumScore - b.maximumScore)
        return possibleGames[0]
    }

    static async createCurrentGameObject() {
        const gameData = await getLatestGame()
        const letterData = await JSON.parse(gameData.letters)
        const dictionary = readFromDictionaryFile()
        return new Game({
            id: gameData.id,
            letters: letterData.letters,
            keyLetter: letterData.keyLetter,
            dictionary
        })
    }
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

export function possibleScore(answers) {
    let score = 0
    Object.keys(answers).forEach(ans => {
        score += ans.length < 5 ? 4 : ans.length
    })
    return score
}
