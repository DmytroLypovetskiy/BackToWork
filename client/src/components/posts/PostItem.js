import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, archivePost, unarchivePost } from '../../actions/post';

class PostItem extends React.Component {
  render() {
    const {
      deletePost,
      archivePost,
      unarchivePost,
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
      showActions
    } = this.props;

    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className="col-md-2">
            <img src={logo} alt='' className='rounded-circle img-fluid' />
          </div>
          <div className="col-md-4">
            <h2 className='h5'>{title}</h2>
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
            
            {showActions ? 
              <div className="d-flex justify-content-between">
                <Link
                  to={`/posts/${_id}`}
                  className='btn btn-primary rounded-pill'
                >
                  View Job
                </Link>
              
                {!auth.loading && auth.company && company === auth.company._id && (
                  <Fragment>
                    
                    {isActive ? 
                      <button onClick={ (e) => archivePost(_id) } className='btn btn-outline-danger rounded-pill'>
                        <i className='fas fa-lock'></i> Archive
                      </button>
                      :
                      <button onClick={ (e) => unarchivePost(_id) } className='btn btn-outline-success rounded-pill'>
                        <i className='fas fa-lock-open'></i> Reopen
                      </button>
                    }
                    
                    <button onClick={ (e) => deletePost(_id) } className='btn btn-danger rounded-pill'>
                      <i className='far fa-trash-alt'></i> Delete
                    </button>
                  </Fragment>
                )}
              </div>
              :
              <p><a href={link} className='btn btn-outline-primary rounded-pill'>Apply</a></p>
            }
          </div>
        </div>
      </li>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  archivePost: PropTypes.func.isRequired,
  unarchivePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { deletePost, archivePost, unarchivePost } )(PostItem);