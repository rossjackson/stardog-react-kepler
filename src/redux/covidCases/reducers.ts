import { CovidCasesSelectColumnNames } from 'queries/covidCasesQueries'
import { DataProps } from 'stardog/useQuery'
import { CovidCasesDataActionTypes, CovidCasesDataUpdate } from './types'

export const covidCasesReducer = (
    state = [] as Record<CovidCasesSelectColumnNames, DataProps>[],
    action: CovidCasesDataActionTypes
): Record<CovidCasesSelectColumnNames, DataProps>[] => {
    switch (action.type) {
        case CovidCasesDataUpdate:
            return action.covidCases
        default:
            return state
    }
}
