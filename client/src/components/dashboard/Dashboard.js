import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Spinner } from '../layout';
import { Link } from 'react-router-dom';
import { DashboardActions } from './'

class Dashboard extends React.Component {
  /*
  componentDidMount() {
    const { getCurrentProfile } = this.props;

    console.log(this.props);

    getCurrentProfile();
  }
  */

  componentDidUpdate(prev) {
    const { getCurrentProfile } = this.props;

    if (prev.auth.company === null) {
      getCurrentProfile();
    }
  }

  render() {
    const { auth: { company }, profile : { profile, loading }, deleteAccount } = this.props;

    return company && loading && profile === null ? 
      <Spinner />
      :
      <Fragment>
        <h1 className="text-primary">Dashboard</h1>
        <div className="pt-5">
          <h2><i className="fas fa-building"></i> { company && company.name }</h2>
          {profile !== null ? 
            <Fragment>
              <ul className="list-unstyled">
                {profile.website ? <li><a href={profile.website}>Company website</a></li> : ''}
                {profile.locations.length > 0 ? <li className="text-secondary">{profile.locations.join(', ')}</li> : ''}
              </ul>

              {profile.info ? <p>{profile.info}</p> : ''}

              <div className="pt-5 d-flex justify-content-between">
              <DashboardActions />
                <button className="btn btn-danger rounded-pill" onClick={ deleteAccount }>
                  <i className="far fa-trash-alt"></i> Delete My Account
                </button>
              </div>
            </Fragment>
            :
            <Fragment>
              <p><strong>{ company && company.name }</strong> has not yet setup a profile. Please add company information.</p>
              <Link to="/create-profile" className="btn btn-primary rounded-pill">Create Profile</Link>
            </Fragment>
          }
        </div>
      </Fragment>;
  }
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect( mapStateToProps, { getCurrentProfile, deleteAccount } )(Dashboard);