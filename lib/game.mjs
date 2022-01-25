import { contains, without, shuffle } from 'underscore'
import { saveGame, getLatestGame, getAllWordsFromDictionary } from './database.mjs'
import { canBePangram, uniqueChars, possibleScore } from './util.mjs'

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

        this.pangrams = this.getAllPangrams(letters.length)
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

    getAllPangrams(numberOfLetters) {
        return Object.keys(this.#answers).filter(word => {
            return canBePangram(word, numberOfLetters)
        })
    }

    getQualifyingWords() {
        if (this.#answers) {
            return this.#answers
        }

        let answers = {}
        const keyLetter = this.keyLetter
        const letters = this.letters
        this.#dictionary.forEach(({word}) => {
            const uniques = uniqueChars(word)
            if (
                !contains(uniques, keyLetter) ||
                without(uniques, ...letters).length > 0
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
        this.letters = shuffle(this.letters)
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

    static async createNewGame(numberOfLetters) {
        const dictionary = await getAllWordsFromDictionary()
        const pangrams = dictionary.filter(d => canBePangram(d.word, numberOfLetters))

        if (!pangrams.length) {
            console.warn('No pangrams in the current dictionary!')
            return
        }

        const pangram = pangrams[Math.floor(Math.random() * pangrams.length)]
        const letters = uniqueChars(pangram.word)

        const possibleGames = letters.map(l => new Game({ letters, keyLetter: l, dictionary, numberOfLetters }))
        possibleGames.sort((a, b) => a.maximumScore - b.maximumScore)
        return possibleGames[0]
    }

    static async createCurrentGameObject() {
        const gameData = await getLatestGame()
        const letterData = await JSON.parse(gameData.letters)
        const dictionary = await getAllWordsFromDictionary()
        return new Game({
            id: gameData.id,
            letters: letterData.letters,
            keyLetter: letterData.keyLetter,
            dictionary
        })
    }
}
