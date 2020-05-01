import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Alert } from './../layout';

class PostForm extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      locations: [],
      text: '',
      link: '' 
    }
  }

  setFieldToState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = async (e) => {
    const { addPost } = this.props;

    e.preventDefault();
    addPost(this.state);

    this.setState({
      title: '',
      locations: [],
      text: '',
      link: '' 
    });
    addPost(this.state);
  }

  render() {
    const {
      title,
      locations,
      text,
      link
    } = this.state;

    return (
      <Fragment>
        <h1>Add Job</h1>
        <p>Create Job Description</p>
        <Alert />
        <form onSubmit={ this.onSubmit } className="pt-5">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="title">Job Title</label>
              <input type="text" className="form-control rounded-pill" name="title"
                value={title}
                onChange={this.setFieldToState}
                required
                placeholder="title" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="locations">Locations <small>(Use comma separated)</small></label>
              <input type="text" className="form-control rounded-pill" name="locations"
                value={locations}
                onChange={this.setFieldToState}
                required
                placeholder="locations" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="link">Link to apply for job</label>
              <input type="text" className="form-control rounded-pill" name="link"
                value={link}
                onChange={this.setFieldToState}
                required
                placeholder="link" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="text">Job Description</label>
              <textarea
                className="form-control" rows="5" name="text"
                value={text}
                onChange={this.setFieldToState}
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill">Post</button>
          <label>or <Link to="/dashboard">Go Back</Link> to Dashboard</label>
        </form>
      </Fragment>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { addPost } )(PostForm);
