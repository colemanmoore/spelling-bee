import { getWordFromDictionary, removeWordFromDictionary } from 'bin/database.mjs'

export default async (req, res) => {

    let result

    switch (req.method) {

        case 'GET':
            result = await getWordFromDictionary(req.query.word)
            return result.length ? res.status(200).json({ data: result[0] }) : res.status(404)

        case 'DELETE':
            result = await removeWordFromDictionary(req.query.word)
            return res.status(200).json({
                wordAlreadyExisted: result.affectedRows > 0
            })

        default:
            return res.status(405)
    }
}