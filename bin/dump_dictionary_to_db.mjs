import fs from 'fs'
import { addWordsToDictionary, addWordToDictionary } from './database.mjs'
import { uniqueChars } from './game.mjs'

const DICT = process.argv[2], UNIG = process.argv[3]

if (!DICT) {
    console.log(`Usage:\n[command] [path to dictionary txt] [path to unigram frequency csv]`)
    process.exit(1)
}

let wordsList = fs.readFileSync(DICT).toString().split('\n')
if (wordsList[0].indexOf(',') >= 0) {
    wordsList = wordsList.map(word => word.split(',')[0])
}
wordsList = wordsList.filter(w => w.length !== 0)
console.log('Done reading dictionary')

const frequencies = {}
if (UNIG) {
    const unigramFreqList = fs.readFileSync(UNIG).toString().split('\n')
    unigramFreqList.forEach(l => {
        const [word, numb] = l.split(',')
        const freq = parseInt(numb)
        if (!isNaN(freq) && word.length > 3) {
            frequencies[word] = freq
        }
    })
    console.log('Done reading frequency data')
}

const chunk = 10
wordsList.length < chunk ? insertSingles() : await insertInChunks()
process.exit(0)

async function insertInChunks() {
    let i, j, temporary
    console.log('Inserting in chunks of', chunk)
    for (i = 0, j = wordsList.length; i < j; i += chunk) {
        temporary = wordsList.slice(i, i + chunk)
        let data = temporary.map(word => ({
            word,
            unique_letters: uniqueChars(word).length,
            length: word.length,
            frequency: frequencies[word] ? frequencies[word] : 0
        }))
        console.log(`Adding ${data.map(d => d.word)}`)
        await addWordsToDictionary(data)
    }
}

async function insertSingles() {
    console.log(`Inserting one by one: ${wordsList}`)
    wordsList.forEach(word => {
        addWordToDictionary({
            word,
            unique_letters: uniqueChars(word).length,
            length: word.length,
            frequency: frequencies[word] ? frequencies[word] : 0
        })
    })
}
