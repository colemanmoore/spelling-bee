import { useState } from 'react'
import http from 'axios'

export default function useApi() {

    const [isLoadingGame, setIsLoadingGame] = useState(false)
    const [isPostingSubmission, setIsPostingSubmission] = useState(false)
    const [fetchGameError, setFetchGameError] = useState(null)
    const [submissionError, setSubmissionError] = useState(null)

    async function fetchGame() {
        setIsLoadingGame(true)

        const resp = await http.get('/api/current-game')
        setIsLoadingGame(false)

        let data = await resp.json()
        
        if (!resp.ok) {
            setFetchGameError(data.error)
            return
        }

        return data
    }

    async function postSubmission(submission) {
        setIsPostingSubmission(true)
        const resp = await http.post('/api/current-game', {
            submission: submission
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