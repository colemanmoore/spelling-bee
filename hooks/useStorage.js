export default function useStorage() {

    const isBrowser = (() => typeof window !== 'undefined')()

    const SS_GAME_ID_KEY = 'sb_gameId'
    const SS_WORDS_FOUND_KEY = 'sb_wordsFound'
    const SS_GAME_SCORE_KEY = 'sb_gameScore'

    let storage
    if (isBrowser) {
        storage = window.sessionStorage
    } else {
        storage = {
            getItem: () => '',
            setItem: () => ''
        }
    }

    function getGame() {
        const val = storage.getItem(SS_GAME_ID_KEY)
        const id = parseInt(val)
        return isNaN(id) ? null : id
    }

    function resetGame(id) {
        storage.setItem(SS_GAME_ID_KEY, id)
        storage.setItem(SS_WORDS_FOUND_KEY, JSON.stringify([]))
        storage.setItem(SS_GAME_SCORE_KEY, 0)
    }

    async function getWords() {
        return JSON.parse(storage.getItem(SS_WORDS_FOUND_KEY))
    }

    async function saveWord(word) {
        const stored = storage.getItem(SS_WORDS_FOUND_KEY)
        const previous = stored ? await JSON.parse(stored) : []
        const next = JSON.stringify(previous.concat([word]))
        return storage.setItem(SS_WORDS_FOUND_KEY, next)
    }


    function getScore() {
        const val = storage.getItem(SS_GAME_SCORE_KEY)
        const score = parseInt(val)
        return isNaN(score) ? null : score
    }

    function saveScore(score) {
        return storage.setItem(SS_GAME_SCORE_KEY, score)
    }

    return {
        getGame,
        resetGame,
        getWords,
        saveWord,
        getScore,
        saveScore
    }
}