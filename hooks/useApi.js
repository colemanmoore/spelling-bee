import { useState } from 'react'

export default function useApi() {

    const [isLoadingGame, setIsLoadingGame] = useState(false)
    const [isPostingSubmission, setIsPostingSubmission] = useState(false)
    const [fetchGameError, setFetchGameError] = useState(null)
    const [submissionError, setSubmissionError] = useState(null)

    async function fetchGame() {
        setIsLoadingGame(true)

        const resp = await fetch('/api/current-game', {
            method: 'GET'
        })
        setIsLoadingGame(false)

        if (!resp.ok) {
            console.log(resp)
            const d = await resp.json()
            console.log(d)
            setFetchGameError('Could not find today\'s game')
            return
        }

        const data = await resp.json()
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

        if (!resp.ok) {
            setSubmissionError('Could not submit word')
            return
        }

        const data = await resp.json()
        return data
    }

    return {
        fetchGame,
        postSubmission,
        isLoadingGame,
        isPostingSubmission,
        fetchGameError,
        submissionError
    }
}