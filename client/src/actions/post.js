import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_ARCHIVE
} from './types';

// Get posts
export const getPosts = (isAuthenticated) => async (dispatch) => {
  try {

    const { data } = (isAuthenticated ?
      await axios.get('/api/posts/logged')
      :
      await axios.get('/api/posts')
    );

    dispatch({
      type: GET_POSTS,
      payload: data
    });
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: data
    });

    dispatch(setAlert('Job created', 'success'));
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: data
    });
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Job removed', 'success'));
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
};

// Archive post
export const archivePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/archive/${id}`);

    dispatch({
      type: UPDATE_ARCHIVE,
      payload: data
    });

    dispatch(setAlert('Job archived', 'success'));
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
};

// Unarchive post
export const unarchivePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/unarchive/${id}`);

    dispatch({
      type: UPDATE_ARCHIVE,
      payload: data
    });

    dispatch(setAlert('Job unarchived', 'success'));
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
};