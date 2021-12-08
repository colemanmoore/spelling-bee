import { readFromDictionaryFile } from './io.mjs'
import { Game, getQualifyingWords, createFromDbResult } from './game.mjs'
import { getTodaysGame } from './database.mjs'

const letterMax = process.argv[2]
if (!letterMax) {
    console.log('Must include letter maximum')
    process.exit(0)
}

const wordsList = await readFromDictionaryFile()
const gameData = await getTodaysGame()
const game = await createFromDbResult(gameData)
const answers = getQualifyingWords({
    wordsList,
    ...game
})

console.log(Object.keys(answers).filter(a => a.length == letterMax))
process.exit(0)