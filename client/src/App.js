import React from 'react';
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import Header from './components/layout/Header/Header';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => (
  <HashRouter>
    <Header />
    <div className="container">
      container
    </div>
    <div className="container-fluid">
      container-fluid
    </div>
    
    <h1>App</h1>
    <Navbar />
    <Route exact path='/' component={Landing} />
  </HashRouter>
);

export default App;
