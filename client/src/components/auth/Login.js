import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Alert } from './../layout';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  setFieldToState(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  async onSubmit(e) {
    const { email, password } = this.state;
    const { login } = this.props;

    e.preventDefault();

    login({ email, password });
  }

  render() {
    const { email, password, } = this.state;
    const { isAuthenticated } = this.props;

    // Redirect if logged in
    if(isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Fragment>
        <h1>Sign In</h1>
        <p>Sign Into Your Company</p>
        <Alert />
        <form onSubmit={ (e)=> this.onSubmit(e) } className="pt-5">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExa mpleInput">Company email</label>
              <input type="email" className="form-control rounded-pill" name="email"
                value={email}
                onChange={(e) => this.setFieldToState(e)}
                placeholder="Email" required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control rounded-pill" name="password"
                value={password}
                onChange={(e) => this.setFieldToState(e)}
                id="inputPassword" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill">Login</button>
          <label>Don't have an account? <Link to="/register">Register</Link></label>
        </form>
      </Fragment>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps, { login } )(Login);