import { Game } from '../lib/game.mjs'
import { clearOldestGame } from '../lib/database.mjs'

console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

const game = await Game.createNewGame(7)

console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})\n${game.toString()}`)

try {
    await game.save()
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