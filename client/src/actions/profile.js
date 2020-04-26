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
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}