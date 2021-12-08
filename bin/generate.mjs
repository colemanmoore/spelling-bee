import { createFromDictionary } from './game.mjs'
import { saveGame } from './database.mjs'

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = createFromDictionary()

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

try {
    await saveGame(game)
} catch (e) {
    console.log(e)
    console.log('Error saving game')
}

process.exit(0)