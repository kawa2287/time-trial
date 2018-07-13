'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import LayoutMobile from './components/LayoutMobile';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import VsTournament from './components/VsTournament';
import VsMobile from './components/VsMobile';

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={IndexPage}/>
		<Route path="VsTournament" component={VsTournament}/>
		<Route path="/" component={LayoutMobile}>
			<Route path="VsMobile" component={VsMobile}/>
		</Route>
		<Route path="*" component={NotFoundPage}/>
	</Route>
  
);

export default routes;