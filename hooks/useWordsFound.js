import { useState } from 'react'

export default function useWordsFound() {

    const [wordsFound, setWordsFound] = useState({})
    const [wordsStack, setWordsStack] = useState([])

    function addWord(word) {
        const lowercase = word.toLowerCase()
        if (wordsFound[lowercase]) return
        setWordsFound({
            ...wordsFound,
            [lowercase]: true
        })
        const stack = [...wordsStack, lowercase]
        setWordsStack(stack)
    }

    function hasWord(word) {
        return wordsFound[word.toLowerCase()]
    }

    function inAlphabeticalOrder() {
        const list = [].concat(wordsStack)
        return list.sort((a,b) => {
            if (a < b) return -1
            if (b < a) return 1
            return 0
        })
    }

    return {
        hashMap: wordsFound,
        stack: wordsStack,
        alpha: inAlphabeticalOrder(),
        addWord,
        hasWord
    }
}