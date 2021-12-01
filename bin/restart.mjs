import fetch from 'node-fetch'

const url = `https://api.heroku.com/apps/${process.env.APP_NAME}/dynos`
console.log('Restarting with url', url)

try {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.heroku+json; version=3'
        }
    })

    if (res.ok) {
        console.log('Restart success')
    } else {
        console.log('Restart not successful')
    }

} catch (e) {
    console.warn('Could not restart via curl')
    console.trace(e)
}