import pg from 'pg'
const { Pool } = pg
const connection = new Pool()
await connection.connect()

createDictionaryTable()
createGameTable()

export {
    addWordToDictionary,
    addWordsToDictionary,
    getWordFromDictionary,
    removeWordFromDictionary,
    removeWordsFromDictionaryById,
    getAllWordsFromDictionary,
    saveGame,
    updateGame,
    getLatestGame,
    clearOldestGame
}

async function createDictionaryTable() {
    // return new Promise((resolve, reject) => {
    //     connection.query(`
    //     CREATE TABLE IF NOT EXISTS dictionary(
    //         id INT NOT NULL AUTO_INCREMENT,
    //         word VARCHAR(32) NOT NULL,
    //         unique_letters INT,
    //         PRIMARY KEY ( id ),
    //         UNIQUE KEY unique_word ( word )
    //     );
    //     `, (err, result) => {
    //         if (err) reject(err)
    //         resolve(result)
    //     })
    // })
}

async function createGameTable() {
    // return new Promise((resolve, reject) => {
    //     connection.query(`
    //     CREATE TABLE IF NOT EXISTS games(
    //         id INT NOT NULL AUTO_INCREMENT,
    //         date DATETIME NOT NULL, 
    //         letters VARCHAR(64) NOT NULL, 
    //         max_points INT,
    //         PRIMARY KEY ( id )
    //     );
    //     `, (err, result) => {
    //         if (err) reject(err)
    //         resolve(result)
    //     })
    // })
}

function queryCallback(resolve, reject, error, result) {
    if (error) return reject(error)
    resolve(result)
}

async function addWordToDictionary({ word, unique_letters }) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO dictionary(word, unique_letters) VALUES (${word}, ${unique_letters}) ON CONFLICT (word) DO NOTHING;`,
            (err, result) => queryCallback(resolve, reject, err, result)
        )
    })
}

async function addWordsToDictionary(words) {
    const values = words.map(w => `('${w.word}',${w.unique_letters})`)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO dictionary(word, unique_letters) VALUES ${values} ON CONFLICT (word) DO NOTHING;`,
            (err, result) => queryCallback(resolve, reject, err, result))
    })
}

async function getWordFromDictionary(word) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM dictionary d WHERE d.word = '${word}';`,
            (err, result) => queryCallback(resolve, reject, err, result)
        )
    })
}

async function removeWordFromDictionary(word) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM dictionary d WHERE d.word = '${word}';`,
            (err, result) => queryCallback(resolve, reject, err, result)
        )
    })
}

async function removeWordsFromDictionaryById(ids) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM dictionary d WHERE d.id IN ( ${ids} );`,
            (err, result) => queryCallback(resolve, reject, err, result)
        )
    })
}

async function getAllWordsFromDictionary(filters, limit) {
    let stmt = 'SELECT d.* FROM dictionary d'
    if (filters && filters.length) {
        stmt += ' WHERE'
        filters.forEach((f, i) => {
            stmt += `${i > 0 ? ' AND' : ' '} ${f}`
        })
    }
    if (limit && !isNaN(parseInt(limit))) {
        stmt += ` LIMIT ${limit}`
    }
    stmt += ';'
    const data = await new Promise((resolve, reject) => {
        connection.query(stmt, (err, result) => queryCallback(resolve, reject, err, result))
    })
    return data.rows.map(row => ({ ...row }))
}

async function saveGame(game) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO games(created_at, letters, max_points) VALUES (NOW(), '${game.toString()}', ${game.maximumScore});`,
            (err, result) => queryCallback(resolve, reject, err, result)
        )
    })
}

async function updateGame(id, game) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE games SET created_at = NOW(), letters = '${game.toString()}', max_points = ${game.maximumScore} WHERE id = ${id};`,
            (err, result) => queryCallback(resolve, reject, err, result)
        )
    })
}

async function getLatestGame() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM games g ORDER BY g.created_at DESC`, (err, results) => {
            connection.end()
            if (err) reject(err)
            if (results.length) {
                resolve(results[0])
            } else {
                reject('There is no game for today!')
            }
        })
    })
}

async function clearOldestGame() {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM games g WHERE g.created_at < (NOW() + INTERVAL '-31 day')`,
            (err, result) => queryCallback(resolve, reject, err, result))
    })
}