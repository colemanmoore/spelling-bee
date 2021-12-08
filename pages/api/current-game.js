import { getTodaysGame } from '../../bin/database'
import { createFromDbResult } from '../../bin/game.mjs'

let game

export default async (req, res) => {

    switch (req.method) {

        case 'GET':

            try {
                await fetchGame()
            } catch (e) {
                res.status(404).json({error: e})
                return
            }

            try {
                res.status(200).json({
                    letters: game.getAllLetters(),
                    maxScore: game.maximumScore
                })
            } catch (e) {
                res.status(500).json({error: 'Server error with game object'})
                return
            }

        case 'POST':

            try {
                await fetchGame()
            } catch (e) {
                res.status(404).send(e)
            }

            try {
                const body = JSON.parse(req.body)

                const response = {
                    grade: game.submit(body.submission),
                    message: null
                }

                if (response.grade < 1) {
                    response.message = 'Not in word list'
                    
                } else if (game.pangrams.includes(body.submission.toLowerCase())) {
                    response.message = 'Pangram!'
                }

                res.status(200).json(response)
                return
            } catch (e) {
                res.status(500)
                return
            }
    }
}

async function fetchGame() {
    if (game) return

    try {
        const gameData = await getTodaysGame()
        game = await createFromDbResult(gameData)
    } catch (error) {
        throw error
    }
}