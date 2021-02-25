import KeplerDemo from 'KeplerDemo'
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from 'redux/configureStore'
import { StardogProvider } from 'stardog/StardogContext'

export const store = configureStore()

const App = () => {
    return (
        <ReduxProvider store={store}>
            <StardogProvider
                username="anonymous"
                password="anonymous"
                endpoint="https://express.stardog.cloud:5820"
            >
                <KeplerDemo />
            </StardogProvider>
        </ReduxProvider>
    )
}

export default App
