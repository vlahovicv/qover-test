import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import CalculateInsurance from './pages/CalculateInsurance/CalculateInsurance';
import LoginPage from './pages/LoginPage/LoginPage';
import PricePage from './pages/PricePage/PricePage';
import history from './history'

function App(): JSX.Element {
  const token = localStorage.getItem('token');
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/calculate" render={() => (token ? <CalculateInsurance /> : <Redirect to="/" />)} />
        <Route path="/price" render={() => (token ? <PricePage /> : <Redirect to="/" />)} />
      </Switch>
    </Router>
  );
}

export default App;
