import fs from 'fs'
import { createFromDictionary } from './game.mjs'
import { DICTIONARY_PATH } from './io.mjs'
import { saveGame } from './database.mjs'

const wordsList = fs.readFileSync(DICTIONARY_PATH).toString().split('\n')

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = createFromDictionary(wordsList)

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

await saveGame(game)
process.exit(0)