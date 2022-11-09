const {Database, SpellingBee} = require('@colemanmoore/spelling-bee-core');

exports.handler = async function(event, context) {
  console.log('Received event:', event);

  const db = new Database()
  const Game = new SpellingBee(db)

  console.log(`Begin finding pangram... (${(new Date()).toLocaleTimeString()})`)

  const game = await Game.createNewGame(7)

  console.log(`End finding pangram. (${(new Date()).toLocaleTimeString()})\n${game.toString()}`)

  try {
    await game.save()

  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      message: 'Error saving game'
    }
  }

  try {
    await db.clearOldestGame()
  } catch (e) {
    console.log(e)
    console.log('Error clearing old game')
    return {
      statusCode: 500,
      message: 'Error clearing old game'
    }
  }

  return {
    statusCode: 200
  }
}
