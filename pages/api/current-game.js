import { createCurrentGameObject } from '../../bin/game.mjs'

let game

export default async (req, res, next) => {

    try {
        await fetchGame()
    } catch (e) {
        res.status(404).send({error: e.message})
        return
    }

    switch (req.method) {

        case 'GET':

            res.status(200).json({
                letters: game.getAllLetters(),
                maxScore: game.maximumScore
            })

            return next()

        case 'POST':

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
            return next()
    }
}

async function fetchGame() {
    if (game) return game
    try {
        game = await createCurrentGameObject()
        return game
    } catch (e) {
        throw new Error(e)
    }
}