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
      <li className='list-group-item'>
        <div className='row'>
          <div div className="col-md-2">
            <img src={logo} alt='' className='rounded-circle img-fluid' />
          </div>
          <div className="col-md-8">
            <h3>{name}</h3>
            {locations.length > 0 && (
              <p className='text-secondary'>{locations.join(', ')}</p>
            )}
            <p>
              <Link
                to={`/profile/${_id}`}
                className='btn btn-primary rounded-pill'
              >
                View Company
              </Link>
            </p>
          </div>
        </div>
      </li>
    );
  }
}
