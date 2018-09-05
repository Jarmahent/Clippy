/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import ClippyPage from './containers/ClippyPage';
import SettingsPage from './containers/SettingsPage';

// Insert the taskBar here

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.CLIPPY} component={ClippyPage} />
      <Route exact path={routes.SETTINGS} component={SettingsPage} />
    </Switch>
  </App>
);
