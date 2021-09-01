const BASE_URL = 'https://restcountries.eu/rest/v2';


const endPoints = {
    all: `${BASE_URL}/all`,
    byName: `${BASE_URL}/name`,
    byRegion: `${BASE_URL}/region`,
    byCode: `${BASE_URL}/alpha`
}

export default endPoints;