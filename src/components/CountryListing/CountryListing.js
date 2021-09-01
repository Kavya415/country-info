import { Row } from "react-bootstrap";
import CountryFilter from '../CountryFilter/CountryFilter';
import CountryDisplayArea from '../CountryDisplayArea/CountryDisplayArea';
import { useState } from 'react';

const CountryListing = (props) => {
    
    const [searchString, updateSearchString] = useState('');
    const [sortOption, updateSortOption] = useState('');

    const updateSearchStringHandler = (searchString) => {
        updateSearchString(searchString);
    }

    const updateSortOptionHandler = (event) => {
        updateSortOption(event);
    }

    return (
        <Row id="country-listing-wrap">
            <CountryFilter
                mode={props.mode}
                currentSortTitle={sortOption}
                updateSearchString={updateSearchStringHandler}
                updateSortOption={updateSortOptionHandler} />

            <CountryDisplayArea
                mode={props.mode}
                searchString={searchString}
                sortOption={sortOption} />
        </Row>
    );
}

export default CountryListing;