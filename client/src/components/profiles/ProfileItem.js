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
        <img src={logo} alt='' className='rounded-circle' />
        <div>
          <h3>{name}</h3>
          <p className='text-secondary'></p>
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
      </li>
    );
  }
}
