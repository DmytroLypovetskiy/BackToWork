import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadCompany } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

import { Header, Landing } from './components/layout';
import { Login, Register } from './components/auth';
import { Dashboard } from './components/dashboard';
import { PrivateRoute } from './components/routing';
import { CreateProfile, EditProfile } from './components/profile-forms';
import { Profiles } from './components/profiles';
import { Profile } from './components/profile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadCompany());
  }, []); //[] means it runs once and not infinity run

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Route exact path='/' component={Landing} />
        <section className="container shadow p-5 mb-5 bg-white rounded">
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          </Switch>
        </section>
      </BrowserRouter>
    </Provider>
)};

export default App;
