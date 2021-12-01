import fs from 'fs'
import { createFromDictionary } from './game.mjs'
import { DICTIONARY_PATH, GAME_OBJECT_PATH } from './io.mjs'

const wordsList = fs.readFileSync(DICTIONARY_PATH).toString().split('\n')

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = createFromDictionary(wordsList)

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

fs.writeFileSync(GAME_OBJECT_PATH, game.toString())