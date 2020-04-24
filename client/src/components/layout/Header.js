import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Auth } from './index';
import './header.scss';

export default class Header extends React.Component {
  render() {
    return (
      <header className="container justify-content-between shadow px-5 py-3 mb-5 bg-white rounded-bottom">
        <div id="logo">
          <Link to="/">BackToWork</Link>
        </div>
        <Navbar />
        <Auth />
      </header>
    )
  }
}