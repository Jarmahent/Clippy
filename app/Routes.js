/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ClippyPage from './containers/ClippyPage';

// Insert the taskBar here

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.CLIPPY} component={ClippyPage} />
      <Route exact path={routes.COUNTER} component={CounterPage} />
      <Route exact path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
