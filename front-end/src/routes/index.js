import React from "react";
import {
  BrowserRouter,
  Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginPage from '../containers/LoginPage/loadable'
import HomePage from '../containers/HomePage/loadable'

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route render={() => <div>not found</div>} />
    </Switch>
  </BrowserRouter>
)
