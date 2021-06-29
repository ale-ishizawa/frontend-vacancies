import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Vacancies from './views/Vacancies';

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute component={Vacancies} exact path="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
