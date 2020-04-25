import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, auth: { isAuthenticated, loading }, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !isAuthenticated && !loading ?
            <Redirect to='/login' />
            :
            <Component {...props} />
        }
      />
    )
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect( mapStateToProps )(PrivateRoute);