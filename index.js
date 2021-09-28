const fs = require('fs')
const _ = require('underscore')

const words_json = fs.readFileSync('dictionary.json')
const wordsHash = JSON.parse(words_json)
const wordsList = Object.keys(wordsHash)

const pangrams = wordsList.filter(canBePangram)

const chosenPangram = choosePangram()
const letters = uniqueChars(chosenPangram)

console.log(`Letters: ${letters}`)
console.log(`Pangram: ${chosenPangram}`)

letters.forEach(centerLetter => {
    const answers = getQualifyingWords(centerLetter)
    console.log(`${centerLetter}: ${answers.length}`)
    console.log(answers.slice(0,10))
})


function canBePangram(word) {
    if (typeof word !== 'string') return false
    const uniques = uniqueChars(word)
    return uniques.length === 7
}

function choosePangram() {
    return pangrams[Math.floor(Math.random() * pangrams.length)]
}

function uniqueChars(word) {
    const chars = word.split('')
    const uniques = chars.filter((value, index, self) =>
        self.indexOf(value) === index)
    return shuffleChars(uniques)
}

function shuffleChars(chars) {
    const array = [...chars]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function getQualifyingWords(centerLetter) {
    let answers = []

    wordsList.forEach(word => {

        const uniques = uniqueChars(word)
        if (!_.contains(uniques, centerLetter)) return

        const wrong = _.without(uniques, ...letters)
        if (wrong.length > 0) return

        answers.push(word)
    })
    return answers
}