const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null  // تأكد من إعادة تعيين الخطأ أيضًا
      };
    default:
      return state;
  }
};

export default authReducer;
