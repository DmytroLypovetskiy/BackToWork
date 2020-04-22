import React from 'react';
import './header.scss';

const Header = () => {
  return (
    <header className="container justify-content-between shadow p-3 mb-5 bg-white rounded">
      <div id="logo">
        <a href="/">BackToWork</a>
      </div>
      <nav>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" href="#">Job Search</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
        </ul>
      </nav>
      <div id="auth">
        <a className="btn btn-primary rounded-pill" href="#" role="button"><i className="far fa-user-circle"></i> For Employer / Post Job</a>
      </div>
    </header>
  )
}

export default Header
