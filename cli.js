const fs = require('fs')
const _ = require('underscore')
const inquirer = require('inquirer')

const words_json = fs.readFileSync('dictionary.json')
const wordsHash = JSON.parse(words_json)
const wordsList = Object.keys(wordsHash)

const pangram = choosePangram()
const letters = _.shuffle(uniqueChars(pangram))
const keyLetter = letters[0]
const answers = getQualifyingWords(keyLetter)

let done = false
async function prompt() {

    while (!done) {
        let response = await inquirer.prompt([
            {
                name: 'word',
                message: `${letters} ~~~ key is ${keyLetter}`
            }
        ])

        if (response.word === '$$$') { // TODO better escape hatch
            done = true
            return
        }

        if (answers[response.word] === 1) {
            // TODO track score!
            console.log('correct!')
        } else {
            console.log('wrong!')
        }
        return prompt()
    }
}
prompt()

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

function getQualifyingWords(centerLetter) {
    let answers = {}
    wordsList.forEach(word => {
        const uniques = uniqueChars(word)
        if (
            !_.contains(uniques, centerLetter) ||
            _.without(uniques, ...letters).length > 0
        ) return

        answers[word] = 1
    })
    return answers
}
