import { useState } from 'react'

export default function useApi() {

    const [isLoadingGame, setIsLoadingGame] = useState(false)
    const [isPostingSubmission, setIsPostingSubmission] = useState(false)

    async function fetchGame() {
        setIsLoadingGame(true)
        const resp = await fetch('/api/current-game', { 
            method: 'GET' 
        })
        const data = await resp.json()
        setIsLoadingGame(false)
        return data
    }

    async function postSubmission(submission) {
        setIsPostingSubmission(true)
        const resp = await fetch('/api/current-game', {
            method: 'POST',
            body: JSON.stringify({
                submission: submission
            })
        })
        const data = await resp.json()
        setIsPostingSubmission(false)
        return data
    }

    return {
        fetchGame,
        postSubmission,
        isLoadingGame,
        isPostingSubmission
    }
}