const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAILURE':
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };
    case 'VERIFY_SUCCESS':
      return {
        ...state,
        user: { ...state.user, isVerified: true },
      };
    case 'VERIFY_FAIL':
      return {
        ...state,
        error: payload,
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: payload,
      };
    case 'FETCH_USERS_FAIL':
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
