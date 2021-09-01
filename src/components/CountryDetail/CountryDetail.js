import { Row, Button, Col, Image } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Api from '../../utilities/rest/Api';
import axios from '../../utilities/rest/Axios';
import './CountryDetail.css';
import CommonEnums from "../../utilities/enums/CommonEnums";

const CountryDetail = (props) => {

    let classNamesForMainRow = "country-detail-wrapper " + (props.mode === CommonEnums.LIGHT_MODE ? "white" : "black text-color-white");
    // let classNamesForBorderCountriesBtn = "border-countries-btn " + (props.mode === CommonEnums.LIGHT_MODE ? "white" : "white");
    const params = useParams();
    const [countryInfo, updateCountryInfo] = useState({});

    const fetchOnlyUsefulInformation = useCallback((data) => {
        // updateBorderInfo(data.borders);

        const transformedData = {
            shortCode: data.alpha3Code,
            flag: data.flag,
            name: data.name,
            population: data.population,
            capital: data.capital,
            region: data.region,
            callingCodes: data.callingCodes,
            subRegion: data.subregion,
            timezones: data.timezones,
            borders: data.borders,
            currencyName: data.currencies[0].name,
            currencySymbol: data.currencies[0].symbol,
            language: data.languages[0].name
        }
        updateCountryInfo(transformedData);
    }, []);

    const fetchByCode = useCallback(() => {
        axios.get(Api.byCode + '/' + params.shortCode)
            .then((response) => response.data)
            .then(response => fetchOnlyUsefulInformation(response));

        // borders.forEach(element => {
        //     axios.get(Api.byCode + '/' + element)
        //     .then((response) => prepareBordersInfo(response))
        // });
    }, [params.shortCode, fetchOnlyUsefulInformation]);

    useEffect(() => {
        fetchByCode();
    }, [fetchByCode]);

    let currencySymbol = "";

    if (countryInfo.currencySymbol != null && countryInfo.currencySymbol.length !== 0) {
        currencySymbol = "( " + countryInfo.currencySymbol + " )";
    }

    let borders = CommonEnums.NO_BORDERS_TEXT;
    if (countryInfo.borders != null && countryInfo.borders.length !== 0) {
        borders = countryInfo.borders.map(borderCountry =>
            <Button key={borderCountry} className="border-countries-btn white bold-font" variant="outline-secondary">
                <Link to={"/" + borderCountry}> {borderCountry}</Link>
            </Button>);

    }

    return (
        <Row className={classNamesForMainRow}>
            <Link to="/" className="back-button"><Button className="white bold-font" variant="outline-secondary">Go Back</Button></Link>
            <Row className="info-wrap">
                <Col xs={12} md={6}>
                    <Image src={countryInfo.flag} fluid />
                </Col>
                <Col xs={12} md={6} className="info-col">
                    <h2>{countryInfo.name}</h2>
                    <div className="d-flex country-info-wrap">
                        <div className="w-50">
                            <p>Capital : {countryInfo.capital}</p>
                            <p>Population : {countryInfo.population}</p>
                            <p>Region : {countryInfo.region}</p>
                            <p>Sub-region : {countryInfo.subRegion}</p>
                        </div>
                        <div className="w-50">
                            <p>Calling Codes : {countryInfo.callingCodes}</p>
                            <p>TimeZones : {countryInfo.timezones}</p>
                            <p>Currency : {countryInfo.currencyName} {currencySymbol}</p>
                            <p>Languages : {countryInfo.language}</p>
                        </div>
                    </div>
                    <p><span className="bold-font">Borders</span> : {borders}</p>
                </Col>
            </Row>
        </Row>
    );
}

export default CountryDetail;