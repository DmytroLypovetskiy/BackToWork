import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { PostItem, PostItemShortInfo } from './';
import { getPosts, getPost } from '../../actions/post';
import { Alert } from './../layout';

class Posts extends React.Component {
  componentDidMount() {
    const { getPosts, auth: { isAuthenticated } } = this.props;

    getPosts(isAuthenticated);
  }
  componentDidUpdate(prev) {
    const { getPosts, auth: { isAuthenticated }, post: { posts, post } } = this.props;

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
    const { post: { posts, loading, post }, getPost } = this.props;

    console.log(this.props);
    const firstPost = posts[0];
    console.log(firstPost);

    return loading ?
      <Spinner />
      :
      <Fragment>
        <h1>Jobs</h1>
        <p>{posts && <strong>{posts.length}</strong>} Companies are looking for:</p>
        <Alert />
        <div className='pt-5'>
          {posts && posts.length > 0 ?
            <div className='row'>
              <div className="col-md-4 list-group-flush">
                {posts.map((post, idx) => {
                  return <div key={post._id} onClick={ (e) => getPost(post._id) }>
                    <PostItemShortInfo post={post} />
                  </div>;
                })}
              </div>
              <div className="col-md-8 list-group-item rounded pt-5">
                {post && post._id ?
                  <PostItem post={post} showActions={false} />
                  :
                  posts[0] && <PostItem post={posts[0]} showActions={false} />
                }
              </div>
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
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, getPost })(Posts);