import { Row } from "react-bootstrap";
import Country from '../Country/Country';
import './CountryDisplayArea.css';
import { useEffect, useCallback, useState } from 'react';
import Api from '../../utilities/rest/Api';
import axios from '../../utilities/rest/Axios';
import CommonEnums from '../../utilities/enums/CommonEnums';

const CountryDisplayArea = (props) => {

    let classNamesForMainRow = props.mode === CommonEnums.LIGHT_MODE ? "white" : "black";
    const [allCountriesData, updateAllCountriesData] = useState([]);

    const fetchOnlyUsefulInformation = (response) => {
        const transformedData = response.map(data => {
            return {
                shortCode: data.alpha3Code,
                flag: data.flag,
                name: data.name,
                population: data.population,
                capital: data.capital,
                region: data.region
            }
        });

        // filteredData = transformedData;
        updateAllCountriesData(transformedData);

        // console.log("Transformed data is " + JSON.stringify(transformedData));
        return transformedData;
    }

    const fetchAllCountries = useCallback(() => {
        // console.log("api for all end points " + Api.all);

        axios.get(Api.all)
            .then((response) => response.data)
            .then(response => fetchOnlyUsefulInformation(response));
    }, []);

    const searchStringExists = (searchString) => {
        return searchString != null && searchString.length !== 0;
    }

    const sortOptionExists = (sortOption) => {
        return sortOption != null && sortOption.length !== 0 && sortOption.localeCompare("All") !== 0;
    }

    const fetchByName = useCallback((searchString) => {
        axios.get(Api.byName + '/' + searchString)
            .then(response => response.data)
            .then(response => fetchOnlyUsefulInformation(response));
    }, []);

    const filterResultsByRegion = (fetchedResultsByName, sortOption) => {
        return fetchedResultsByName.filter(result => {
            return result.region.localeCompare(sortOption)
        });
    }

    const fetchByRegion = useCallback((sortOption) => {
        axios.get(Api.byRegion + '/' + sortOption)
            .then(response => response.data)
            .then(response => fetchOnlyUsefulInformation(response));
    }, []);

    useEffect(() => {
        if (!searchStringExists(props.searchString) && !sortOptionExists(props.sortOption)) {
            fetchAllCountries();
        } else if (searchStringExists(props.searchString)) {
            let fetchedResultsByName = fetchByName(props.searchString);
            if (sortOptionExists(props.sortOption)) {
                console.log("filterin by regiong");
                filterResultsByRegion(fetchedResultsByName, props.sortOption);
            }
        } else {
            fetchByRegion(props.sortOption);
        }
    }, [fetchAllCountries, fetchByName, fetchByRegion, props.searchString, props.sortOption]);

    return (
        <Row id="country-display-wrapper" className={classNamesForMainRow}>
            <Row className="all-countries-wrap">
            {allCountriesData.map(country => <Country
                key={country.shortCode}
                shortCode={country.shortCode}
                flag={country.flag}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
            />)}
            </Row>
        </Row>
    );
}


export default CountryDisplayArea;