import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

import { Header, Landing } from './components/layout';
import { Login, Register } from './components/auth';

const App = () => (
  <BrowserRouter>
    <Header />
    <Route exact path='/' component={Landing} />
    <section className="container-fluid">
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </section>
  </BrowserRouter>
);

export default App;
