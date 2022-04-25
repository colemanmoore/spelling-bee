import fs from 'fs'
import { Database, Util } from '@colemanmoore/spelling-bee-core'

const
    CHUNK = process.argv[2],
    DICT = process.argv[3]

if (!DICT) {
    console.log(`Usage:\n[command] [chunk size] [path to dictionary txt]`)
    process.exit(1)
}

let wordsList = fs.readFileSync(DICT).toString().split('\n')
if (wordsList[0].indexOf(',') >= 0) {
    wordsList = wordsList.map(word => word.split(',')[0])
}
wordsList = wordsList.filter(w => w.length !== 0)
console.log('Done reading dictionary')

const db = new Database()
await db.initialize()
wordsList.length < CHUNK ? insertSingles() : await insertInChunks()
process.exit(0)

async function insertInChunks() {
    let i, j, temporary
    console.log('Inserting in chunks of', CHUNK)
    for (i = 0, j = wordsList.length; i < j; i += CHUNK) {
        temporary = wordsList.slice(i, i + CHUNK)
        let data = temporary.map(word => ({
            word,
            unique_letters: Util.uniqueChars(word).length
        }))
        console.log(`Adding ${data.map(d => d.word)}`)
        await db.addWordsToDictionary(data)
    }
}

async function insertSingles() {
    console.log(`Inserting one by one: ${wordsList}`)
    wordsList.forEach(word => {
        db.addWordToDictionary({
            word,
            unique_letters: Util.uniqueChars(word).length,
            // length: word.length,
            // frequency: frequencies[word] ? frequencies[word] : 0
        })
    })
}
