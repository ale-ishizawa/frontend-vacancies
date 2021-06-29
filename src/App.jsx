import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Routes from './Routes';

// Browser history
const browserHistory = createBrowserHistory();

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </MuiThemeProvider>
);

export default App;
