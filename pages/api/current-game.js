import { getTodaysGame } from '../../bin/database'
import { Game } from '../../bin/game.mjs'

let game

export default async (req, res) => {

    if (!game) {
        game = await fetchGame()
    }

    if (req.method === 'GET') {

        res.status(200).json({
            letters: game.getAllLetters(),
            maxScore: game.maximumScore
        })
    }

    if (req.method === 'POST') {
        const body = JSON.parse(req.body)

        const response = {}
            response.grade = game.submit(body.submission)
            if (response.grade < 1) {
                response.message = 'Not in word list'
            } else if (game.pangrams.includes(body.submission.toLowerCase())) {
                response.message = 'Pangram!'
            }
            res.status(200).json(response)

    }
}

async function fetchGame() {
    const gameDataRaw = await getTodaysGame()
    const letterData = await JSON.parse(gameDataRaw.letters)

    return new Game({
        letters: letterData.letters,
        keyLetter: letterData.keyLetter
    })
}