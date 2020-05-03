import React from 'react';
import { Link } from 'react-router-dom';

export default class ProfileItem extends React.Component {
  render() {
    const {
      profile: {
        company: { _id, name, logo },
        locations
      }
    } = this.props;

    return (
      <div className='list-group-item'>
        <div className='row'>
          <div div className="col-md-1">
            <Link to={`/profile/${_id}`} title={name}>
              <img src={logo} alt={name} title={name} className='rounded-circle img-fluid logo' />
            </Link>
          </div>
          <div className="col-md-4">
            <h2 className='h5'>
              <Link to={`/profile/${_id}`} title={name}>{name}</Link>
            </h2>
            {locations.length > 0 && (
              <p className='text-secondary'>{locations.join(', ')}</p>
            )}
          </div>
          <div className="col-md-7">
            <p>
              <Link
                to={`/profile/${_id}`}
                className='btn btn-primary rounded-pill px-3'
                title={name}
              >
                View Company
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
