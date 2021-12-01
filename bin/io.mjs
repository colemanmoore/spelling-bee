import fs from 'fs'
import { Game, getQualifyingWords } from './game.mjs'

export const DICTIONARY_PATH =  process.env.DICTIONARY_PATH || 'dictionary_long.txt'
export const GAME_OBJECT_PATH = process.env.GAME_OBJECT_PATH || 'output'

export function readFromDictionaryFile() {
    const wordsList = fs.readFileSync(DICTIONARY_PATH).toString().split('\n')
    return wordsList
}

export function writeToGameObjectFile() {
    fs.writeFileSync(GAME_OBJECT_PATH, game.toString())
}

export function readFromGameObjectFile() {
    try {
        const data = JSON.parse(fs.readFileSync(GAME_OBJECT_PATH).toString())

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