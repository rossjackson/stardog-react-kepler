import { CovidCasesSelectColumnNames } from 'queries/covidCasesQueries'
import { DataProps } from 'stardog/useQuery'
import { CovidCasesDataActionTypes } from './covidCases/types'

export type AppActionTypes = CovidCasesDataActionTypes

export interface IAppState {
    covidCasesData: Record<CovidCasesSelectColumnNames, DataProps>[]
}
