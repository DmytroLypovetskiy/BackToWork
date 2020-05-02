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

  render() {
    const {
      profile: { profiles, loading }
    } = this.props;

    console.log(profiles);

    return loading ?
      <Spinner />
      :
      <Fragment>
        <h1>Companies</h1>
        <div className='pt-5'>
          {profiles && profiles.length > 0 ? (
            <div className='list-group list-group-flush'>
              {profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })}
            </div>
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
