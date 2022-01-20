import { useState } from 'react'
import http from 'axios'

export default function useApi() {

    const [isLoadingGame, setIsLoadingGame] = useState(false)
    const [isPostingSubmission, setIsPostingSubmission] = useState(false)
    const [fetchGameError, setFetchGameError] = useState(null)
    const [submissionError, setSubmissionError] = useState(null)

    async function fetchGame() {
        setIsLoadingGame(true)

        let data
        try {
            const resp = await http.get('/api/current-game')
            data = resp.data
        } catch (error) {
            console.log(error)
            setFetchGameError(error)
        }

        setIsLoadingGame(false)
        return data
    }

    async function postSubmission(submission) {
        setIsPostingSubmission(true)

        let data
        try {
            const resp = await http.post('/api/current-game', {
                submission
            })
            data = resp.data
        } catch (error) {
            console.error(error)
            setSubmissionError('Could not submit word')
        }

        setIsPostingSubmission(false)
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