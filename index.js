const fs = require('fs')

const words_json = fs.readFileSync('words_dictionary.json')
const words = JSON.parse(words_json)
const pangrams = Object.keys(words).filter(canBePangram)

const chosenPangram = choosePangram()
let letters = uniqueChars(chosenPangram)

letters = shuffleChars(letters)

console.log(`Letters: ${letters}`)
console.log(`Pangram: ${chosenPangram}`)




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
    return uniques
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