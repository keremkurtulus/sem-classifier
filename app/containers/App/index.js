/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Main from 'containers/Main/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import '../../assets/scss/style.scss';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - SEM Classifier" defaultTitle="SEM Classifier">
        <meta name="description" content="SEM Classifier" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/" component={Main} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </div>
  );
}
