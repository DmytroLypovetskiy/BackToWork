import {
	REGISTER_SUCCESS,
  REGISTER_FAIL,
  COMPANY_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	company: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case COMPANY_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        company: payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}