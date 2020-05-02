import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { getPost } from '../../actions/post';
import { PostItem } from '../posts';
import { Link } from 'react-router-dom';

class Post extends React.Component {
  componentDidMount() {
    const { getPost, match } = this.props;

    getPost(match.params.id);
  }

  componentDidUpdate(prev) {
    if (prev.post.post === null) {
      const { getPost, match } = this.props;

      getPost(match.params.id);
    }
  }

  render() {
    const { post: { post, loading } } = this.props;

    return post === null || loading ?
    <Spinner />
    :
    <Fragment>
      <h1>Job information</h1>
      <div className="pt-5">
        <div className='list-group list-group-flush'>
          <PostItem post={post} showActions={false} />
        </div>

        <div className="pt-5 d-flex justify-content-between">
          <Link to='/posts' className='btn btn-outline-primary rounded-pill'><i className="fas fa-caret-left" aria-hidden="true"></i> Back to Jobs</Link>
        </div>
      </div>
    </Fragment>
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
