import keplerGlReducer from 'kepler.gl/reducers'
import { combineReducers } from 'redux'
import { covidCasesReducer } from './covidCases/reducers'

export const appReducer = combineReducers({
    keplerGl: keplerGlReducer,
    covidCasesData: covidCasesReducer,
})

// export type AppState = CombinedState<IAppState>
