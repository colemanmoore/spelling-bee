import fs from 'fs'
import { getAllWordsFromDictionary } from '../lib/database.mjs'
import { uniqueChars } from '../lib/util.mjs'

if (!process.argv[2]) {
    console.log('arguments wrong')
    process.exit(0)
}

const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const startsWith = process.argv[2]
const rows = await getAllWordsFromDictionary([
    `word LIKE '${startsWith}%'`
])

// const stream = fs.createWriteStream(`${process.argv[2]}/${startsWith}.txt`)

// stream.once('open', fd => {
//     rows.forEach(row => {
//         stream.write(`${row.word}\n`)
//     })
// })

rows.forEach(row => {
    console.log(row.word)
})
console.log(rows.length)
process.exit(0)