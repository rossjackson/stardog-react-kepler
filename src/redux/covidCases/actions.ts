import { CovidCasesSelectColumnNames } from 'queries/covidCasesQueries'
import { DataProps } from 'stardog/useQuery'
import { CovidCasesDataUpdate, CovidCasesDataUpdateAction } from './types'

export const covidCasesDataUpdateData = (
    covidCases: Record<CovidCasesSelectColumnNames, DataProps>[]
): CovidCasesDataUpdateAction => ({
    type: CovidCasesDataUpdate,
    covidCases,
})
