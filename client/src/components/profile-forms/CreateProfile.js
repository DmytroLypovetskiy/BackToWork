import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from './../layout';
import { createProfile } from '../../actions/profile';

class CreateProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      website: '',
      locations: [],
      info: ''
    }
  }

  setFieldToState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = async (e) => {
    const { createProfile, history } = this.props;

    e.preventDefault();
    createProfile(this.state, history);
  }

  render() {
    const {
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
              <label htmlFor="formGroupExa mpleInput">Company Website</label>
              <input type="text" className="form-control rounded-pill" name="website"
                value={website}
                onChange={this.setFieldToState}
                placeholder="website"  />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Locations <small>(Use comma separated)</small></label>
              <input type="text" className="form-control rounded-pill" name="locations"
                value={locations}
                onChange={this.setFieldToState}
                placeholder="locations"  />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="inputPassword2">Company Information</label>
              <textarea
                className="form-control" rows="5" name="info"
                value={info}
                onChange={this.setFieldToState}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill">Register</button>
          <label>or <Link to="/dashboard">Go Back</Link> to Dashboard</label>
          
        </form>
      </Fragment>
    )
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired 
};


export default connect( null, { createProfile } )(withRouter(CreateProfile));