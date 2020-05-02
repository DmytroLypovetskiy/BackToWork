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
      <div className='list-group list-group-flush'>
        <div className="list-group-item">
          <div className="row">
            <div className="col-md-1">
              <img src={logo} alt={name} className="rounded-circle img-fluid" />
            </div>
            <div className="col-md-4">
              <h2 className="h5">{name}</h2>
              {locations.length > 0 && (
                <p className='text-secondary'>{locations.join(', ')}</p>
              )}
              {website && (
                <p className='small'><a href={website} title={name} target="_blank" rel='noopener noreferrer'>Company website</a></p>
              )}
            </div>
            <div className="col-md-7">
              {info && (
                <p>{info}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileTop.ProfileTop = {
  profile: PropTypes.object.isRequired
};
