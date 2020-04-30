import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
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
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const { data } = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
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
};

// Get profile by ID
export const getProfileById = (companyId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/company/${companyId}`);

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
};

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
    const { errors } = err.response.data;

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
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Company has been deleted', 'primary'));
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
};