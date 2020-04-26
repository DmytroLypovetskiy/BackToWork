import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from './../layout';

class CreateProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      company: '',
      website: '',
      locations: [],
      info: ''
    }
  }

  setFieldToState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = async (e) => {
    const {
      company,
      website,
      locations,
      info
    } = this.state;
    const { setAlert, register } = this.props;

    e.preventDefault();

    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  }

  render() {
    const {
      company,
      website,
      locations,
      info
    } = this.state;

    return (
      <Fragment>
        <h1>Profile</h1>
        <p>Create Company Profile</p>
        <Alert />
        <form onSubmit={ this.onSubmit } className="pt-5">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExampleInput">Company Name</label>
              <input type="text" className="form-control rounded-pill" name="company" 
                value={company}
                onChange={ this.setFieldToState } 
                placeholder="Company name" required />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="formGroupExa mpleInput">Company Website</label>
              <input type="text" className="form-control rounded-pill" name="website"
                value={website}
                onChange={this.setFieldToState}
                placeholder="website" required />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Locations <small>(Use comma separated)</small></label>
              <input type="text" className="form-control rounded-pill" name="locations"
                value={locations}
                onChange={this.setFieldToState}
                placeholder="locations" required />
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword2">Company Information</label>
              <textarea
                className="form-control" rows="5" name="info"
                value={info}
                onChange={this.setFieldToState}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill">Register</button>
        </form>
      </Fragment>
    )
  }
}

CreateProfile.propTypes = {
  
};

const mapStateToProps = (state) => ({
  
});

export default connect( mapStateToProps )(CreateProfile);