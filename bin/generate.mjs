import fs from 'fs'
import { createFromDictionary } from './game.mjs'

const DICTIONARY = 'dictionary_long.txt'
const wordsList = fs.readFileSync(DICTIONARY).toString().split('\n')

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = createFromDictionary(wordsList)

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

fs.writeFileSync(process.env.OUTPUT_PATH || './output', game.toString())