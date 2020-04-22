import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link active" to="/search">Job Search</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Link</Link>
          </li>
        </ul>
      </nav>
    )
  }
}