// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { Container } from 'react-bootstrap';
import CountryListing from './components/CountryListing/CountryListing';
import CountryDetail from './components/CountryDetail/CountryDetail';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [mode, changeMode] = useState(0);
  const modeChangeHandler = () => {
    changeMode((prevMode) => 1 - prevMode);
  }

  return (
    <Container fluid className="App" style={{padding:0}}>
      <Header currentMode={mode} modeChange={modeChangeHandler} />
      <Switch>
        <Route path='/' exact>
          <CountryListing mode={mode} />
        </Route>

        <Route path='/:shortCode'>
          <CountryDetail mode={mode} />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
