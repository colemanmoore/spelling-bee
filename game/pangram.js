import fs from 'fs'
import _ from 'underscore'
import { getQualifyingWords, uniqueChars, canBePangram, possibleScore } from './util'

const MIN_POINTS = 150
const MAX_POINTS = 350

module.exports = {
    bruteForce,
    intelligent
}

function bruteForce({ doNotVet }) {

    console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

    const words_json = fs.readFileSync('./dictionary.json')
    const wordsList = Object.keys(JSON.parse(words_json))
    const pangrams = _.filter(wordsList, canBePangram)

    let lowScoring = false, initializations = 0
    let pangram, letters, keyLetter, answers

    do {
        initializations++
        pangram = pangrams[Math.floor(Math.random() * pangrams.length)]
        letters = uniqueChars(pangram)
        keyLetter = letters[Math.floor(Math.random() * letters.length)]
        answers = getQualifyingWords({ wordsList, keyLetter, letters})

        if (MIN_POINTS < possibleScore(answers) && possibleScore(answers) < MAX_POINTS) {
            lowScoring = true
        }

    } while (!lowScoring && !doNotVet && initializations < 100000)

    if (!lowScoring && !doNotVet)
        console.warn(`Never found good pangram (${(new Date()).toLocaleTimeString()})`)
    else
        console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

    return {
        letters,
        keyLetter,
        answers,
        pangram
    }
}

function intelligent() {
    // for each word

        // set of all unique letters

        // if set size == 7

            // sort letters alpha

            // add as a key to map if not present

            // add current word to list value of map entry

    // sort letter sets alpha

    // for each letter set
}
