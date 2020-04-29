import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul className="nav justify-content-center">
        <li className="nav-item">
            <Link className="nav-link" to="/profiles">Companies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">Job Search</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">About us</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-outline-primary rounded-pill" to="/register" role="button">Support Us</Link>
          </li>
        </ul>
      </nav>
    )
  }
}