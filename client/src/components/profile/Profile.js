import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { DashboardActions } from '../dashboard';
import { ProfileTop } from './';

class Profile extends React.Component {
  componentDidMount() {
    const { getProfileById, match } = this.props;

    getProfileById(match.params.id);
  }

  componentDidUpdate(prev) {
    if (prev.profile.profile === null) {
      const { getProfileById, match } = this.props;

      getProfileById(match.params.id);
    }
  }

  render() {
    const {
      profile: { profile, loading }, auth
    } = this.props;

    return profile === null || loading ?
    <Spinner />
    :
    <Fragment>
      <h1>Company information</h1>
      <div className="pt-5">
        <ProfileTop profile={profile} />
        
        <div className="pt-5 d-flex justify-content-between">
          <Link to='/profiles' className='btn btn-outline-primary rounded-pill px-3'><i className='fas fa-long-arrow-alt-left'></i> Back To Companies</Link>
          {auth.isAuthenticated && auth.loading === false && auth.company._id === profile.company._id && <DashboardActions />}
        </div>
      </div>
    </Fragment>
  }
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);