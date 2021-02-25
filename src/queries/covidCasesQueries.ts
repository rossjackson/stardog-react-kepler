export const covidDbName = 'covid19nyt'

const selectColumnNames = [
    'countyName',
    'cases',
    'population',
    'percentClass',
    'lat',
    'lng',
] as const

export type CovidCasesSelectColumnNames = typeof selectColumnNames[number]

export const covidCasesQuery = `PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX ps: <http://www.wikidata.org/prop/statement/>
PREFIX psv: <http://www.wikidata.org/prop/statement/value/>
PREFIX wikibase: <http://wikiba.se/ontology#>

SELECT ?${selectColumnNames.join(' ?')}
{
    # get the latest date
    { SELECT (max(?d) as ?date) { ?r :date ?d } }

    # get all the reports for the latest date
    ?report
        :cases ?cases  ;
        :date ?date ;                
        :county [
            rdfs:label ?countyName ;
            :fips ?fips
        ]    

    # Get coordinates of
    SERVICE <https://query.wikidata.org/sparql> 
    {
        SELECT * {
            ?item wdt:P882 ?fips ;
                  wdt:P1082 ?population ;
                  p:P625 ?coordPoint .
            ?coordPoint psv:P625 ?coord_node .
            ?coord_node wikibase:geoLongitude ?lng ;
                        wikibase:geoLatitude ?lat .
        }
    }   
    # compute percentages
    BIND(roundHalfToEven((?cases / ?population) * 100, 2) AS ?percentCases)
}
ORDER BY desc(?percentCases)`
