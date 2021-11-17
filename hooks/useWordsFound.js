import { useState, useEffect } from 'react'

export default function useWordsFound() {

    const [wordsFound, setWordsFound] = useState(new Map())
    const [wordsFoundInsertionOrder, setWordsFoundInsertionOrder] = useState([])
    const [wordsFoundAlpha, setWordsFoundAlpha] = useState([])

    useEffect(() => {
        setWordsFoundAlpha(listWordsAlpha())
        setWordsFoundInsertionOrder(listWordsInsertionOrder())
    }, [wordsFound])

    function addWord(word) {
        setWordsFound(map => new Map(map.set(word, true)))
    }

    function listWordsInsertionOrder() {
        const list = []
        wordsFound.forEach((val, word) => list.push(word))
        return list
    }

    function listWordsAlpha() {
        const list = listWordsInsertionOrder()
        return list.sort((a,b) => {
            if (a < b) return -1
            if (b < a) return 1
            return 0
        })
    }

    return [wordsFound, addWord, wordsFoundInsertionOrder, wordsFoundAlpha]
}