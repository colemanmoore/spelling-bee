import { readFromGameObjectFile, readFromDictionaryFile } from './io.mjs'
import { getQualifyingWords } from './game.mjs'

const letterMax = process.argv[2]
if (!letterMax) {
    console.log('Must include letter maximum')
    process.exit(0)
}

const wordsList = readFromDictionaryFile()
const game = readFromGameObjectFile()
const answers = getQualifyingWords({
    wordsList,
    ...game
})

console.log(Object.keys(answers).filter(a => a.length == letterMax))