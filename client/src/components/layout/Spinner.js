import React, { Fragment } from 'react';
import './spinner.scss';

export default class Spinner extends React.Component {
  render() {
    return (
      <Fragment>
        <i className="fas fa-circle-notch spinner"></i>
      </Fragment>
    )
  }
}
