import { createFromDictionary } from './game.mjs'
import { readFromDictionaryFile } from './io.mjs'
import { saveGame } from './database.mjs'

const wordsList = readFromDictionaryFile()

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = createFromDictionary(wordsList)

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

try {
    await saveGame(game)
} catch (e) {
    console.log(e)
    console.log('Error saving game')
}

process.exit(0)