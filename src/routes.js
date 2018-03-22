'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import VsTournament from './components/VsTournament';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="VsTournament" component={VsTournament}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;