import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {routes} from 'constants/routes';
import NotFoundPage from 'pages/not-found/NotFound';
import VerifiedResult from 'pages/verifier/VerifiedResult'
import SearchBar from 'pages/verifier/SearchBar'

const Router = () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={SearchBar} />
      <Route exact path={routes.VERIFY} component={VerifiedResult} />
      <Route component={NotFoundPage}/>
    </Switch>
  )
}

export default Router;
