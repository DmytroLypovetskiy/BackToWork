import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

import { Header, Landing } from './components/layout';
import { Login, Register } from './components/auth';

const App = () => (
  <BrowserRouter>
    <Header />
    <div className="container">
      container
    </div>
    <div className="container-fluid">
      container-fluid
    </div>
    
    <h1>App</h1>
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
