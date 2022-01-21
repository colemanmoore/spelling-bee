import { Game } from 'bin/game.mjs'
import { MSG_NOT_IN_LIST, MSG_PANGRAM } from 'constants/constants'

let game

export default async (req, res) => {

    try {
        await fetchGame()
    } catch (e) {
        console.error(e)
        res.status(404).send({ error: e.message })
        return
    }

    switch (req.method) {

        case 'GET':

            return res.status(200).json({
                id: game.id,
                letters: game.getAllLetters(),
                maxScore: game.maximumScore
            })

        case 'POST':

            const { submission } = req.body

            const response = {
                grade: game.submit(submission),
                message: null
            }

            if (response.grade < 1) {
                response.message = MSG_NOT_IN_LIST

            } else if (game.pangrams.includes(submission.toLowerCase())) {
                response.message = MSG_PANGRAM
            }

            return res.status(200).json(response)
    }
}

async function fetchGame() {
    if (game) return game
    try {
        game = await Game.createCurrentGameObject()
        return game
    } catch (e) {
        throw new Error(e)
    }
}