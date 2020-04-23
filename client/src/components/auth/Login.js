import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends React.Component {
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

    e.preventDefault();

    console.log('Success');
  }

  render() {
    const { name, email, password, password2 } = this.state;

    return (
      <section className="container shadow p-5 mb-5 bg-white rounded">
        <h1>Sign In</h1>
        <p>Sign Into Your Company</p>
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
      </section>
    )
  }
}