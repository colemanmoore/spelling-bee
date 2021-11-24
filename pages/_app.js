import { ProvideGame } from '../hooks/useGame'
import '../styles/styles.css'

function App({ Component, pageProps }) {
  return (
    <ProvideGame>
      <Component {...pageProps} />
    </ProvideGame>
  )
}

export default App