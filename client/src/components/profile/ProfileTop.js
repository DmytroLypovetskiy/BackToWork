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

        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src={logo} alt={name} className="rounded-circle" />
            </div>
            <div className="col-md-3">
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                {locations.length > 0 && (
                  <p className='text-secondary'>{locations.join(', ')}</p>
                )}
                {website && (
                  <p><a href={website} title={name} target="_blank" rel='noopener noreferrer'><i className="fas fa-external-link-alt"></i> Company website</a></p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                {info && (
                  <p>{info}</p>
                )}
              </div>
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
