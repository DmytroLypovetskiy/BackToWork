import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout';
import { getPosts } from '../../actions/post';

class Posts extends React.Component {
  componentDidMount() {
    const { getPosts, post: { posts, loading } } = this.props;

    getPosts();
  }

  render() {
    return (
      <div>
        
      </div>
    )
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