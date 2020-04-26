import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    // Redirect if logged in to Dashboard page
    if(isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div>
        Landing
      </div>
    )
  }
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )(Landing);