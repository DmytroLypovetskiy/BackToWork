import React from 'react';
import './header.scss';

const Header = () => {
  return (
    <header className="container justify-content-between">
      <div id="logo">
        Logo
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
        <a className="btn btn-primary rounded-pill" href="#" role="button"><i className="fas fa-user-tie"></i> For Employer / Post Job</a>
      </div>
    </header>
  )
}

export default Header
