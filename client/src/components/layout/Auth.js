import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

class Auth extends React.Component {
  render() {
    console.log(this.props);
    const { auth: { isAuthenticated, loading }, logout } = this.props;

    const authLink = (
      <Fragment>
        <li className="nav-item">
          <Link onClick={logout} className="nav-link" to="#"><i className="fas fa-sign-out-alt"></i> Logout</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">My listings</Link>
        </li>
      </Fragment>
    );

    const guestLink = (
      <li className="nav-item">
        <Link className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
      </li>
    );

    return (
      <ul className="nav" id="auth">
        {!loading && <Fragment>{ isAuthenticated ? authLink : guestLink }</Fragment>}
        <li className="nav-item">
          <Link className="btn btn-primary rounded-pill" to="/register" role="button"><i className="far fa-user-circle"></i> For Employer / Post Job</Link>
        </li>
      </ul>
    )
  }
}

Auth.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect( mapStateToProps, { logout } )(Auth);