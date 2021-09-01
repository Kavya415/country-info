import { Row, Col } from "react-bootstrap"
import { FaMoon, FaRegMoon } from 'react-icons/fa';
import './Header.css'

const Header = (props) => {

    return (
        <Row className="header">
            <Col id="title">
                <h5><strong>Where in the world?</strong></h5>
            </Col>
            <Col></Col>
            <Col id="mode" onClick={props.modeChange}>{props.currentMode === 0 ? <FaMoon /> : <FaRegMoon />} {props.currentMode === 0 ? "Dark" : "White"} Mode</Col>
        </Row>
    );
}

export default Header;