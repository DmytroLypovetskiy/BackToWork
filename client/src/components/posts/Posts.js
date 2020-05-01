import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { PostItem } from './';
import { getPosts } from '../../actions/post';
import { Alert } from './../layout';

class Posts extends React.Component {
  componentDidMount() {
    const { getPosts } = this.props;

    getPosts();
  }

  render() {
    const { post: { posts, loading } } = this.props;

    return loading ?
      <Spinner />
      :
      <Fragment>
        <h1>Jobs</h1>
        <p><i className='far fa-list-alt'></i> Available jobs</p>
        <Alert />
        <div className='pt-5'>
          {posts && posts.length > 0 ?
            <ul className='list-group list-group-flush'>
              {posts.map((post) => {
                return <PostItem key={post._id} post={post} />;
              })}
            </ul>
            :
            <p>No jobs available</p>
          }
        </div>
      </Fragment>
  
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);