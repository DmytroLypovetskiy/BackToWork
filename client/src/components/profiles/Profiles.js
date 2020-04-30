import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { getProfiles } from '../../actions/profile';
import { ProfileItem } from './';

class Profiles extends React.Component {
  componentDidMount() {
    const { getProfiles } = this.props;

    getProfiles();
  }

  /*
  componentDidUpdate(prev) {
    console.log(prev);

    if (prev.profile.profile === null) {
      const { getProfiles } = this.props;

      getProfiles();
    }
  }
  */

  render() {
    const {
      profile: { profiles, loading }
    } = this.props;

    return loading ?
      <Spinner />
      :
      <Fragment>
        <h1 className='text-primary'>Companies</h1>
        <div className='pt-5'>
          <h2><i className='far fa-building'></i> List of an awesome companies</h2>

          {profiles.length > 0 ? (
            <ul className='list-group list-group-flush'>
              {profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })}
            </ul>
          ) : (
            <p>No companies found</p>
          )}
        </div>
      </Fragment>
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
