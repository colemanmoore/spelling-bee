import { ProvideGame } from 'hooks/useGame'
import 'styles/global.css'

function App({ Component, pageProps }) {
  return (
    <ProvideGame>
      <Component {...pageProps} />
    </ProvideGame>
  )
}

export default App