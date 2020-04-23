import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { Navbar } from './../index';

export default class Header extends React.Component {
  render() {
    return (
      <header className="container justify-content-between shadow px-5 py-3 mb-5 bg-white rounded-bottom">
        <div id="logo">
          <a href="/">BackToWork</a>
        </div>
        <Navbar />
        <div id="auth">
          <Link className="btn btn-primary rounded-pill" to="/register" role="button"><i className="far fa-user-circle"></i> For Employer / Post Job</Link>
        </div>
      </header>
    )
  }
}
