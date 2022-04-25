import { Database } from '@colemanmoore/spelling-bee-core'

if (!process.argv[2]) {
    console.log('arguments wrong')
    process.exit(0)
}

const startsWith = process.argv[2]

const db = new Database()
await db.initialize()

const rows = await db.getAllWordsFromDictionary([
    `word LIKE '${startsWith}%'`
])

rows.forEach(row => {
    console.log(row.word)
})
console.log(rows.length)
process.exit(0)