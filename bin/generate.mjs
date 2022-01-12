import { createFromDictionary } from './game.mjs'
import { saveGame, clearOldestGame } from './database.mjs'

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = createFromDictionary()

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})`)

try {
    await saveGame(game)
} catch (e) {
    console.log(e)
    console.log('Error saving game')
}

try {
    await clearOldestGame()
} catch (e) {
    console.log(e)
    console.log('Error clearing old game')
}

process.exit(0)