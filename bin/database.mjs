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
        `), (err, result) => {
            if (err) reject(err)
            resolve(result)
        }
    })
}

export async function saveGame(game) {
    // await createTables()
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

export async function getTodaysGame() {
    // await createTables()
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM games WHERE DATE(date) = DATE(NOW());`, (err, result) => {
            if (err) reject(err)

            if (result.length) {
                resolve(result[0])
            } else {
                resolve(null)
            }
        })
    })
}