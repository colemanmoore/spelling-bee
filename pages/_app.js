import { PlayerProvider } from 'context/PlayerState'
import { GameProvider } from 'context/GameState'
import { AppProvider} from '../context/AppState'
import 'styles/global.css'

function App({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <GameProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </GameProvider>
    </PlayerProvider>
  )
}

export default App
