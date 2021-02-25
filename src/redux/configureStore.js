import { taskMiddleware } from 'react-palm/tasks'
import { applyMiddleware, compose, createStore } from 'redux'
import { appReducer } from './appState'

const configureStore = (initialState) => {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    return createStore(
        appReducer,
        initialState,
        composeEnhancers(applyMiddleware(taskMiddleware))
    )
}

export default configureStore
