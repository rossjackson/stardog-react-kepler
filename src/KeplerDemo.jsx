import KeplerGl from 'kepler.gl'
import { addDataToMap, updateMap } from 'kepler.gl/actions'
import { processEnv } from 'processEnv'
import { covidCasesQuery, covidDbName } from 'queries/covidCasesQueries'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoSizer } from 'react-virtualized'
import { covidCasesDataUpdateData } from 'redux/covidCases/actions'
import { useQuery } from 'stardog/useQuery'

const KeplerDemo = () => {
    const { covidCasesData, keplerGl } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [
        getCovidCases,
        { data: getCovidCasesResponseData, loading, error },
    ] = useQuery()

    useEffect(() => {
        if (!covidCasesData.length) {
            getCovidCases({
                dbName: covidDbName,
                readQuery: covidCasesQuery,
            })
        }
    }, [dispatch, covidCasesData, getCovidCases])

    useEffect(() => {
        if (!getCovidCasesResponseData?.length) return

        // This is just a sample on how to dispatch to our own redux
        // This is not used elsewhere.
        dispatch(covidCasesDataUpdateData(getCovidCasesResponseData))

        const covidCasesRows = getCovidCasesResponseData.map((covidCase) => {
            const currentKeys = Object.keys(covidCase)
            return currentKeys.map((currentKey) => {
                if (currentKey === 'countyName')
                    return covidCase[currentKey].value
                return Number(covidCase[currentKey].value)
            })
        })

        const covidCasesInKeplarData = {
            fields: [
                { name: 'cases', format: '', type: 'integer' },
                { name: 'lng', format: '', type: 'real' },
                { name: 'percentCases', format: '', type: 'real' },
                { name: 'lat', format: '', type: 'real' },
                { name: 'countyName', format: '', type: 'string' },
                { name: 'population', format: '', type: 'integer' },
            ],
            rows: covidCasesRows,
        }

        dispatch(
            addDataToMap({
                datasets: {
                    info: {
                        label: 'Counties with most cases per capita',
                        id: 'covid_cases',
                    },
                    data: covidCasesInKeplarData,
                },
                options: {
                    keepExistingConfig: true,
                },
                config: {
                    visState: {
                        layers: [
                            {
                                id: 'wtp9fb',
                                type: 'heatmap',
                                config: {
                                    dataId: 'covid_cases',
                                    label: 'Covid Cases Heatmap',
                                    color: [248, 149, 112],
                                    columns: {
                                        lat: 'lat',
                                        lng: 'lng',
                                    },
                                    isVisible: true,
                                    visConfig: {
                                        opacity: 0.8,
                                        // colorRange: {
                                        //     name: 'Global Warming',
                                        //     type: 'sequential',
                                        //     category: 'Uber',
                                        //     colors: [
                                        //         '#5A1846',
                                        //         '#900C3F',
                                        //         '#C70039',
                                        //         '#E3611C',
                                        //         '#F1920E',
                                        //         '#FFC300',
                                        //     ],
                                        // },
                                        radius: 97.4,
                                    },
                                    hidden: false,
                                    // textLabel: [
                                    //     {
                                    //         field: null,
                                    //         color: [255, 255, 255],
                                    //         size: 18,
                                    //         offset: [0, 0],
                                    //         anchor: 'start',
                                    //         alignment: 'center',
                                    //     },
                                    // ],
                                },
                                visualChannels: {
                                    weightField: {
                                        name: 'percentCases',
                                        type: 'real',
                                    },
                                    weightScale: 'linear',
                                },
                            },
                        ],
                    },
                },
            })
        )
        dispatch(
            updateMap({
                latitude: 39.738756,
                longitude: -105.023357,
                zoom: 4,
            })
        )
    }, [dispatch, getCovidCasesResponseData])

    if (error) return <div>Error! {JSON.stringify(error)}</div>

    return (
        <>
            {loading && <div>Fancy loading screen...</div>}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    visibility: loading ? 'hidden' : 'unset',
                }}
            >
                <AutoSizer>
                    {({ height, width }) => (
                        <KeplerGl
                            id="map"
                            mapboxApiAccessToken={
                                processEnv.REACT_APP_MAPBOX_TOKEN
                            }
                            width={width}
                            height={height}
                        />
                    )}
                </AutoSizer>
            </div>
        </>
    )
}

export default KeplerDemo
