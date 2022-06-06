import { PlayerProvider } from 'context/PlayerState'
import { AppProvider} from 'context/AppState'
import 'styles/global.css'

function App({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </PlayerProvider>
  )
}

export default App
