import mysql from 'mysql'

const connection = mysql.createConnection(process.env.JAWSDB_URL)

async function createTables() {
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

export async function saveGame(game) {
    await createTables()
    const promise = new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO games(date, letters, max_points) VALUES (NOW(), '${game.toString()}', ${game.maximumScore});`,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            }
        )
    })
    connection.disconnect()
    return promise
}

export async function getLatestGame() {
    await createTables()
    const promise = new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM games g ORDER BY g.date DESC`, (err, results) => {
            if (err) reject(err)

            if (results.length) {
                resolve(results[0])
            } else {
                reject('There is no game for today!')
            }
        })
    })
    connection.disconnect()
    return promise
}