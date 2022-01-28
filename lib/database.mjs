import mysql from 'mysql'

let connection
if (process.env.NODE_ENV === 'development') {
    // Keep pool around during hot reload
    if (!global.db) {
        global.db = mysql.createPool(process.env.JAWSDB_URL)
    }
    connection = global.db
} else {
    connection = mysql.createPool(process.env.JAWSDB_URL)
}

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
    getLatestGame,
    clearOldestGame
}

async function createDictionaryTable() {
    return new Promise((resolve, reject) => {
        connection.query(`
        CREATE TABLE IF NOT EXISTS dictionary(
            id INT NOT NULL AUTO_INCREMENT,
            word VARCHAR(32) NOT NULL,
            unique_letters INT,
            PRIMARY KEY ( id ),
            UNIQUE KEY unique_word ( word )
        );
        `, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

async function createGameTable() {
    return new Promise((resolve, reject) => {
        connection.query(`
        CREATE TABLE IF NOT EXISTS games(
            id INT NOT NULL AUTO_INCREMENT,
            date DATETIME NOT NULL, 
            letters VARCHAR(64) NOT NULL, 
            max_points INT,
            PRIMARY KEY ( id )
        );
        `, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

async function addWordToDictionary({ word, unique_letters }) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT IGNORE INTO dictionary(word, unique_letters) VALUES (${word}, ${unique_letters});`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
}

async function addWordsToDictionary(words) {
    const stmt = `INSERT IGNORE INTO dictionary(word, unique_letters) VALUES ?`
    const data = words.map(w => new Array(w.word, w.unique_letters))
    return new Promise((resolve, reject) => {
        connection.query(stmt, [data], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

async function getWordFromDictionary(word) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM dictionary d WHERE d.word = '${word}';`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
}

async function removeWordFromDictionary(word) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM dictionary d WHERE d.word = '${word}';`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
}

async function removeWordsFromDictionaryById(ids) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM dictionary d WHERE d.id IN ( ${ids} );`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
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
        stmt +=` LIMIT ${limit}`
    }
    stmt += ';'
    const data = await new Promise((resolve, reject) => {
        connection.query(stmt, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    return data.map(row => ({ ...row }))
}

async function saveGame(game) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO games(date, letters, max_points) VALUES (NOW(), '${game.toString()}', ${game.maximumScore});`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
}

async function getLatestGame() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM games g ORDER BY g.date DESC`, (err, results) => {
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
        connection.query(`DELETE FROM games g WHERE g.date < ADDDATE(NOW(), INTERVAL -31 DAY)`, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}