import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

// Redux
import { Provider } from 'react-redux';
import store from './store';
/*
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
*/

import { Header, Landing, Alert } from './components/layout';
import { Login, Register } from './components/auth';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
