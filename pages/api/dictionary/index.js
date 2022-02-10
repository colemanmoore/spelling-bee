import { getAllWordsFromDictionary, removeWordsFromDictionaryById } from 'lib/database.mjs'
import { filterType } from 'constants/constants'

export default async (req, res) => {

    let result

    switch (req.method) {

        case 'POST':

            const filters = []
            Object.keys(req.body).forEach(param => {
                switch (param) {
                    case filterType.UNIQUE_EQ:
                        filters.push(`unique_letters = ${req.body[filterType.UNIQUE_EQ]}`)
                        break
                    case filterType.FREQ_GT:
                        filters.push(`frequency > ${req.body[filterType.FREQ_GT]}`)
                        break
                    case filterType.FREQ_LT:
                        filters.push(`frequency < ${req.body[filterType.FREQ_LT]}`)
                        break
                    case filterType.LENGTH_EQ:
                        filters.push(`length = ${req.body[filterType.LENGTH_EQ]}`)
                        break
                    case filterType.LENGTH_LT:
                        filters.push(`length < ${req.body[filterType.LENGTH_LT]}`)
                        break
                    case filterType.LENGTH_GT:
                        filters.push(`length > ${req.body[filterType.LENGTH_GT]}`)
                }
            })

            const limit = req.body[filterType.LIMIT] || null
            result = await getAllWordsFromDictionary(filters, limit)
            return res.status(200).json(result)

        case 'DELETE':

            const ids = req.body.ids
            if (ids && ids.length) {
                result = removeWordsFromDictionaryById(ids)
                return res.status(200).json({ rowsDeleted: result.affectedRows })
            } else {
                return res.status(400)
            }

        default:
            return res.status(405)
    }
}