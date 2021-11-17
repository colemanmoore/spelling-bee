import { genDummy, genBrute, Game } from '../../game/Game'

const game = genBrute()

export default (req, res) => {

    if (req.method === 'GET') {
        let letters = []
        try {
            letters = game.getAllLetters()
        } catch (err) {
            console.log('Error getting letters')
        }
        res.status(200).json({
            letters
        })
    }

    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        const response = {}
        response.grade = game.submit(body.submission)
        if (response.grade < 1) {
            response.message = 'Not in word list'
        }
        res.status(200).json(response)
    }
}
