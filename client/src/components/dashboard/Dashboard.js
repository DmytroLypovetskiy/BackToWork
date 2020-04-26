import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

class Dashboard extends React.Component {
  componentDidMount() {
    const { getCurrentProfile, auth, profile } = this.props;

    getCurrentProfile();
  }
  render() {
    return (
      <div>
        Dashboard
      </div>
    )
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