import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Alert } from './../layout';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  setFieldToState(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  async onSubmit(e) {
    const { name, email, password, password2 } = this.state;
    const { setAlert, register } = this.props;

    e.preventDefault();

    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  }

  render() {
    const { name, email, password, password2 } = this.state;
    const { isAuthenticated } = this.props;

    // Redirect if logged in
    if(isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Fragment>
        <h1>Sign Up</h1>
        <p>Register Your Company</p>
        <Alert />
        <form onSubmit={ (e)=> this.onSubmit(e) } className="pt-5">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExampleInput">Company name</label>
              <input type="text" className="form-control rounded-pill" name="name" 
                value={name}
                onChange={(e) => this.setFieldToState(e)} 
                placeholder="Company name" required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExa mpleInput">Company email</label>
              <input type="email" className="form-control rounded-pill" name="email"
                value={email}
                onChange={(e) => this.setFieldToState(e)}
                placeholder="Email" required />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control rounded-pill" name="password"
                value={password}
                onChange={(e) => this.setFieldToState(e)}
                id="inputPassword" required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword2">Confirm Password</label>
              <input type="password" className="form-control rounded-pill" name="password2"
                value={password2}
                onChange={(e) => this.setFieldToState(e)}
                id="inputPassword2" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill">Register</button>
          <label>Already have an account? <Link to="/login">Sign In</Link></label>
        </form>
      </Fragment>
    )
  }
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps, { setAlert, register } )(Register);