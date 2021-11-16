import { Fragment } from 'react'
import Game from '../game/Game'
const game = new Game()

function Home(props) {
    const { letters } = props
    return ( 
        <div>
            {
            letters ? 
            letters.map(l => (
                <div key={l.text}>{l.text}</div>
            )) : <></>
            }
        </div>
    )
}

export function getStaticProps() {

    return {
        props: {
            letters: game.getAllLetters()
        },
        revalidate: 3600
    }
}

export default Home