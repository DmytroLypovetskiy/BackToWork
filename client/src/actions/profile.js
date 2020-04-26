import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';

// Get current company profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: data
    });
  } catch (err) {
    const { statusText, status } = err.response;

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
}

// Create or update company profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  console.log(formData);
  
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const { data } = await axios.post('/api/profile', formData, config);

    console.log('data start');
    console.log(data);
    console.log('data end');

    dispatch({
      type: GET_PROFILE,
      payload: data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    const { statusText, status } = err.response;

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: statusText,
        status: status
      }
    });
  }
}