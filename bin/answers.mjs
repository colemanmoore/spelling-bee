import { createCurrentGameObject } from './game.mjs'

const wordLength = process.argv[2]

if (!wordLength) {
    console.log('Must target a word length')
    process.exit(0)
}

const game = await createCurrentGameObject()
console.log(Object.keys(game.answers).filter(a => a.length == wordLength))
process.exit(0)