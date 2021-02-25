import { CombinedState, combineReducers } from 'redux'
import { IAppState } from './appTypes'
import { covidCasesReducer } from './covidCases/reducers'

export const appReducer = combineReducers<IAppState>({
    covidCasesData: covidCasesReducer,
})

export type AppState = CombinedState<IAppState>
