import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Register extends React.Component {
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

    e.preventDefault();

    if(password !== password2) {
      console.log('Passwords do not match');
    } else {
      console.log('Success');
      /*
      console.log(this.state);
      const newCompany = {
        name,
        email,
        password
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newCompany);
        const res = await axios.post('/api/companies', body, config);
        console.log(res.data);

      } catch(err) {
        console.err(err.response.data);
      }
      */
    }
  }

  render() {
    const { name, email, password, password2 } = this.state;

    return (
      <section className="container shadow p-5 mb-5 bg-white rounded">
        <h1>Sign Up</h1>
        <p>Register Your Company</p>
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
      </section>
    )
  }
}