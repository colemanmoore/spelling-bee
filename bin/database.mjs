import mysql from 'mysql'

const connection = mysql.createPool(process.env.JAWSDB_URL)

async function createDictionaryTable() {
    return new Promise((resolve, reject) => {
        connection.query(`
        CREATE TABLE IF NOT EXISTS dictionary(
            id INT NOT NULL AUTO_INCREMENT,
            word VARCHAR(32) NOT NULL,
            unique_letters INT,
            length INT,
            frequency INT,
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

export async function addWordToDictionary({ word, unique_letters, length, frequency }) {
    await createDictionaryTable()
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT IGNORE INTO dictionary(word, unique_letters, length, frequency) VALUES (${word}, ${unique_letters}, ${length}, ${frequency});`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
}

export async function addWordsToDictionary(words) {
    await createDictionaryTable()
    const stmt = `INSERT IGNORE INTO dictionary(word, unique_letters, length, frequency) VALUES ?`
    const data = words.map(w => new Array(w.word, w.unique_letters, w.length, w.frequency))
    return new Promise((resolve, reject) => {
        connection.query(stmt, [data], (err, result) => {
            if (err) reject(err)
            console.log(`Added ${data}`)
            resolve(result)
        })
    })
}

export async function getAllWordsFromDictionary() {
    await createDictionaryTable()
    const data = await new Promise((resolve, reject) => {
        connection.query(
            `SELECT d.word FROM dictionary d;`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
    return data.map(row => row.word)
}

export async function getPangramsFromDictionary(uniqueLetters) {
    await createDictionaryTable()
    const data = await new Promise((resolve, reject) => {
        connection.query(
            `SELECT d.word FROM dictionary d WHERE d.unique_letters = ${uniqueLetters};`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
    return data.map(row => row.word)
}

export async function saveGame(game) {
    await createGameTable()
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

export async function getLatestGame() {
    await createGameTable()
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

export async function clearOldestGame() {
    await createGameTable()
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM games g WHERE g.date < ADDDATE(NOW(), INTERVAL -31 DAY)`, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}