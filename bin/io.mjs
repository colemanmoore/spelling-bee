import fs from 'fs'
import { Game, getQualifyingWords } from './game.mjs'

export const DICTIONARY_PATH =  process.env.DICTIONARY_PATH || 'dictionary_long.txt'

export function readFromDictionaryFile() {
    const wordsList = fs.readFileSync(DICTIONARY_PATH).toString().split('\n')
    return wordsList
}

export function readFromGameObjectFile(filepath) {
    try {
        const data = JSON.parse(fs.readFileSync(filepath).toString())

        if (data.keyLetter && data.letters) {
            const answers = getQualifyingWords({ 
                wordsList: readFromDictionaryFile(),
                letters: data.letters,
                keyLetter: data.keyLetter
             })
    
             return new Game({
                 letters: data.letters,
                 keyLetter: data.keyLetter,
                 answers
             })
        }

        throw Error()
    } catch (e) {
        console.error('Could not read game object file')
    }
}