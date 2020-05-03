import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { PostItem } from './';
import { getPosts } from '../../actions/post';
import { Alert } from './../layout';

class Posts extends React.Component {
  componentDidMount() {
    const { getPosts, auth: { isAuthenticated } } = this.props;

    getPosts(isAuthenticated);
  }
  componentDidUpdate(prev) {
    const { getPosts, auth: { isAuthenticated }, post: { posts } } = this.props;

    /* TO BE Fixed
    if (posts.length !== prev.post.posts.length) {
      getPosts(isAuthenticated);
    }
    */

    if (isAuthenticated !== prev.auth.isAuthenticated) {
      getPosts(isAuthenticated);
    }
  }

  render() {
    const { post: { posts, loading } } = this.props;

    return loading ?
      <Spinner />
      :
      <Fragment>
        <h1>Jobs</h1>
        <p>Companies are looking for:</p>
        <Alert />
        <div className='pt-5'>
          {posts && posts.length > 0 ?
            <div className='list-group list-group-flush'>
              {posts.map((post) => {
                return <PostItem key={post._id} post={post} />;
              })}
            </div>
            :
            <p>No jobs available</p>
          }
        </div>
      </Fragment>
  
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);