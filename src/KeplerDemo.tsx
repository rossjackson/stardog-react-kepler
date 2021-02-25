import {
    covidCasesQuery,
    CovidCasesSelectColumnNames,
    covidDbName,
} from 'queries/covidCasesQueries'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'redux/appState'
import { covidCasesDataUpdateData } from 'redux/covidCases/actions'
import { useQuery } from 'stardog/useQuery'

const KeplerDemo = () => {
    const { covidCasesData } = useSelector((state: AppState) => state)
    const dispatch = useDispatch()

    const [
        getCovidCases,
        { data, loading, error },
    ] = useQuery<CovidCasesSelectColumnNames>()

    useEffect(() => {
        if (!covidCasesData.length) {
            getCovidCases({
                dbName: covidDbName,
                readQuery: covidCasesQuery,
            })
        }
    }, [dispatch, covidCasesData, getCovidCases])

    useEffect(() => {
        if (!data?.length) return

        dispatch(covidCasesDataUpdateData(data))
    }, [dispatch, data])

    if (loading) return <div>Fancy loading screen...</div>
    if (error) return <div>Error! {JSON.stringify(error)}</div>

    return <div>{JSON.stringify(covidCasesData)}</div>
}

export default KeplerDemo
