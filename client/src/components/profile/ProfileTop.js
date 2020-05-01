import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default class ProfileTop extends React.Component {
  render() {
    const { 
      profile: {
        company: { name, logo },
        website,
        locations,
        info 
      }
    } = this.props;

    return (
      <Fragment>
        <div className="list-group-item">
          <div className="row">
            <div className="col-md-2">
              <img src={logo} alt={name} className="rounded-circle img-fluid" />
            </div>
            <div className="col-md-4">
              <h2 className="h5">{name}</h2>
              {locations.length > 0 && (
                <p className='text-secondary'>{locations.join(', ')}</p>
              )}
              {website && (
                <p><a href={website} title={name} target="_blank" rel='noopener noreferrer'><i className="fas fa-external-link-alt"></i> Company website</a></p>
              )}
            </div>
            <div className="col-md-6">
              {info && (
                <p>{info}</p>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

ProfileTop.ProfileTop = {
  profile: PropTypes.object.isRequired
};
