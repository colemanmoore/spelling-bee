const fs = require('fs')
const Game = require('./src/Game')

const words_json = fs.readFileSync('dictionary.json')
const wordsList = Object.keys(JSON.parse(words_json))
const game = new Game(wordsList)

console.log(game.prompt())
console.log(`Possible score: ${game.possibleScore()}`)
console.log(`${game.numberOfAnswers()} answers`)
console.log(`Pangram: ${game.pangram}`)