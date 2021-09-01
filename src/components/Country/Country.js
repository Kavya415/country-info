import { Card } from "react-bootstrap";
import './Country.css'
import { Link } from 'react-router-dom';

const Country = (props) => {
    return (
        <Card id="country-card">
            <Link to={"/" + props.shortCode}>
                <Card.Img variant="top" src={props.flag} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle>Capital : {props.capital}</Card.Subtitle>
                    <Card.Text>Region : {props.region}</Card.Text>
                    <Card.Text>Population : {props.population}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default Country;