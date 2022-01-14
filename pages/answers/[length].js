import { Game } from '../../bin/game.mjs'

export default function({ answers }) {
    return <ul>
        {answers.map(a => <li key={a}>{a}</li>)}
    </ul>
}

export async function getServerSideProps(context) {
    let answers = []
    const game = await Game.createCurrentGameObject()

    const wordLength = parseInt(context.params.length)
    if (wordLength && !isNaN(wordLength)) {
        answers = Object.keys(game.getQualifyingWords())
        answers = answers.filter(a => a.length == wordLength)
    }
    
    return { props: { answers }}
}