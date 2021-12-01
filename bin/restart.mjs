import exec from 'exec'

const url = `https://api.heroku.com/apps/${process.env.HEROKU_APP_ID}/dynos`
console.log('Restarting with url', url)

const command = `curl -n -X DELETE ${url} \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3"`

const child = exec(command, (err, stdout, stderr) => {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (err !== null) {
        console.log('exec error: ' + error);
    }
})