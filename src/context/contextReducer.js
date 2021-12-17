const contextReducer = (state, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        console.log('sign in');
        return action.payload;
      case 'SIGN_OUT':
        console.log('sign out');
        return null;
      case 'AUTH_ERR':
        console.log('auth error');
        return null;
      default:
        return state;
    }
  };

  
export default contextReducer;