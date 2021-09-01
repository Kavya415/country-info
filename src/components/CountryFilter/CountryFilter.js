import { Row, InputGroup, FormControl, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';
import './CountryFilter.css';
import CommonEnums from "../../utilities/enums/CommonEnums";

const CountryFilter = (props) => {

    let classNamesForMainRow = "d-flex filter-tab " + (props.mode === CommonEnums.LIGHT_MODE ? "white" : "black");
    const [searchString, setSearchString] = useState('');
    let sortTitle = props.currentSortTitle.length === 0 ? "Filter by Region" : props.currentSortTitle;
    const saveSearchString = (event) => {
        setSearchString(event.target.value);
    }

    const updateSearchStringHandler = (event) => {
        props.updateSearchString(searchString);
        props.updateSortOption('');
    }

    const updateSortOptionHandler = (event) => {
        props.updateSortOption(event);
        props.updateSearchString('');
        setSearchString('');
    }

    return (
        <Row className={classNamesForMainRow}>
            <Row className="row-wrap">
            <div className="d-flex search-tab">
                <InputGroup className="mb-3 search-input">
                    <InputGroup.Text id="search-icon"><BsSearch /></InputGroup.Text>
                    <FormControl
                        placeholder="Search for a country .."
                        aria-label="country-search"
                        aria-describedby="basic-addon1"
                        onInput={saveSearchString}
                        value={searchString}
                    />
                </InputGroup>
                <Button className="search-button white bold-font" variant="outline-secondary" onClick={updateSearchStringHandler}>Search</Button>
            </div>

            <div className="filter-btn">
                <DropdownButton className="dropdown" title={sortTitle} onSelect={updateSortOptionHandler}>
                    <Dropdown.Item eventKey="All">All</Dropdown.Item>
                    <Dropdown.Item eventKey="Africa">Africa</Dropdown.Item>
                    <Dropdown.Item eventKey="Americas">Americas</Dropdown.Item>
                    <Dropdown.Item eventKey="Asia">Asia</Dropdown.Item>
                    <Dropdown.Item eventKey="Europe">Europe</Dropdown.Item>
                    <Dropdown.Item eventKey="Oceania">Oceania</Dropdown.Item>
                </DropdownButton>
            </div>
            </Row>
        </Row>
    );
}

export default CountryFilter;