import fs from 'fs'

export const DICTIONARY_PATH =  process.env.DICTIONARY_PATH || 'dictionary_long.txt'

export function readFromDictionaryFile() {
    const wordsList = fs.readFileSync(DICTIONARY_PATH).toString().split('\n')
    return wordsList
}
