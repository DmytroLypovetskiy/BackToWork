import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
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
    const { auth: { company }, profile : { profile, loading } } = this.props;

    return company && loading && profile === null ? 
      <Spinner />
      :
      <Fragment>
        <h1 className="text-primary">Dashboard</h1>
        <p>
          <i className="fas fa-building"></i> Welcome { company && company.name }
        </p>
        {profile !== null ? 
          <Fragment>
            <DashboardActions />
          </Fragment>
          :
          <Fragment>
            <p><strong>{ company && company.name }</strong> has not yet setup a profile. Please add company information.</p>
            <Link to="/create-profile" className="btn btn-primary rounded-pill">Create Profile</Link>
          </Fragment>
        }
      </Fragment>;
  }
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect( mapStateToProps, { getCurrentProfile } )(Dashboard);