import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Auth } from './';
import './header.scss';

export default class Header extends React.Component {
  render() {
    return (
      <header className="container-fluid mb-5">
        <div className="header container justify-content-between py-3 px-5">
          <div id="logo">
            <Link to="/" className='d-none d-lg-block'>BackToWork</Link>
            <Link to="/" className='d-lg-none'>BTW</Link>
          </div>
          <Navbar />
          <Auth />
        </div>
      </header>
    )
  }
}