import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


export default class DashboardActions extends React.Component {
  render() {
    return (
      <Fragment>
        <Link to="/edit-profile" className="btn btn-primary rounded-pill"><i className="far fa-edit"></i> Edit Profile</Link>
      </Fragment>
    )
  }
}