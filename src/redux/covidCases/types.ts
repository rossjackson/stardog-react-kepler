import { CovidCasesSelectColumnNames } from 'queries/covidCasesQueries'
import { DataProps } from 'stardog/useQuery'

export const CovidCasesDataUpdate = 'CovidCasesDataUpdate'

export interface CovidCasesDataUpdateAction {
    type: typeof CovidCasesDataUpdate
    covidCases: Record<CovidCasesSelectColumnNames, DataProps>[]
}

export type CovidCasesDataActionTypes = CovidCasesDataUpdateAction
