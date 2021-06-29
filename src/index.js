import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Vacancies from './views/Vacancies';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/vacancies" render={(props) => <Vacancies {...props} />} />
      <Redirect to="/vacancies" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
