import { readFromGameObjectFile } from '../../bin/io'

const game = readFromGameObjectFile()
console.log('## Done reading Game Object ##')
console.log(game.letters)

export default (req, res) => {

    if (req.method === 'GET') {
        let letters = []
        try {
            letters = game.getAllLetters()
        } catch (err) {
            console.log('Error getting letters')
        }
        res.status(200).json({
            letters,
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
