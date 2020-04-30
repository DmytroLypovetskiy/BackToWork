import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Auth } from '../layout';
import { connect } from 'react-redux';

class PostItem extends React.Component {
  render() {
    const {
      auth,
      post: {
        _id,
        company,
        title,
        name,
        logo,
        text,
        link,
        locations,
        isActive,
        date
      },
    } = this.props;

    console.log(this.props);

    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className="col-md-2">
            <img src={logo} alt='' className='rounded-circle img-fluid' />
          </div>
          <div className="col-md-4">
            <h3 className='h5'>{title}</h3>
            <h4 className='h6'><Link
                to={`/profile/${company}`}
                className='text-reset'
              >
                {name}
              </Link>
            </h4>
            
            {locations.length > 0 && (
              <p className='text-secondary'>{locations.join(', ')}</p>
            )}
            <p className='small text-secondary'><strong>Posted:</strong> <Moment format='YYYY/MM/DD'>{date}</Moment></p>
          </div>
          <div className="col-md-6">
            <p>{text}</p>
            <p>
              <Link
                to={`/post/${_id}`}
                className='btn btn-primary rounded-pill'
              >
                View Job
              </Link>
             
              {/* !auth.loading && company === auth.company._id && (
                <button className='btn button-danger rounded-pill'>
                  <i className='far fa-trash-alt'></i> Delete
                </button>
              ) */}
            </p>
          </div>
        </div>
      </li>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, {} )(PostItem);