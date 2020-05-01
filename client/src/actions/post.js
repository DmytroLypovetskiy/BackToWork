import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/posts');

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

// Delete posts
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