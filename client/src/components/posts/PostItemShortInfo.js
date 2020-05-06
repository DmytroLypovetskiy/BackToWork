import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, archivePost, unarchivePost } from '../../actions/post';

class PostItemShortInfo extends React.Component {
  render() {
    const {
      auth,
      post: {
        _id,
        company,
        title,
        name,
        logo,
        locations,
        date
      }
    } = this.props;

    return (
      <div className='list-group-item'>
        <div className='row short-info'>
          <div className="col-md-3">
            <Link to={`/posts/${_id}`} title={title}>
              <img src={logo} alt={title} title={title} className='rounded-circle img-fluid logo' />
            </Link>
          </div>
          <div className="col-md-9">
            <h2 className='h5'>
              <Link to={`/posts/${_id}`} title={title}>{title}</Link>
            </h2>
            <h4 className='h6'>
              <Link
                to={`/profile/${company}`}
                className='text-reset'
                title={name}
              >
                {name}
              </Link>
            </h4>
            
            {locations.length > 0 && (
              <p className='text-secondary mb-0'>{locations.join(', ')}</p>
            )}
            <p className='small text-secondary mb-0'><strong>Posted:</strong> <Moment format='YYYY/MM/DD'>{date}</Moment></p>
          </div>
        </div>
      </div>
    );
  }
}

PostItemShortInfo.defaultProps = {
  showActions: true
}

PostItemShortInfo.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  archivePost: PropTypes.func.isRequired,
  unarchivePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { deletePost, archivePost, unarchivePost } )(PostItemShortInfo);