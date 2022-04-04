import { PlayerProvider } from 'context/PlayerState'
import { GameProvider } from 'context/GameState'
import 'styles/global.css'

function App({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </PlayerProvider>
  )
}

export default App