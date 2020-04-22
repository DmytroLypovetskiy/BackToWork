import React, { useState } from 'react';

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

  registerCompany(e) {
    const { name, email, password, password2 } = this.state;

    e.preventDefault();

    if(password !== password2) {
      console.log('Passwords do not match');
    } else {
      console.log(this.state);
    }
  }

  render() {
    const { name, email, password, password2 } = this.state;

    return (
      <section className="container">
        <form onSubmit={ (e)=> this.registerCompany(e) }>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExampleInput">Company name</label>
              <input type="text" className="form-control" name="name" 
                value={name}
                onChange={(e) => this.setFieldToState(e)} 
                placeholder="Company name" required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExa mpleInput">Company email</label>
              <input type="email" className="form-control" name="email"
                value={email}
                onChange={(e) => this.setFieldToState(e)}
                placeholder="Email" required />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control" name="password"
                value={password}
                onChange={(e) => this.setFieldToState(e)}
                id="inputPassword" required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword2">Confirm Password</label>
              <input type="password" className="form-control" name="password2"
                value={password2}
                onChange={(e) => this.setFieldToState(e)}
                id="inputPassword2" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </section>
    )
  }
}