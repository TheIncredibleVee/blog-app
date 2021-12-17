import React, { useReducer, createContext , useState} from 'react';
import contextReducer from './contextReducer';

const initialState =null;

export const UserContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [user, dispatch] = useReducer(contextReducer, initialState);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [error, setError] = useState(null);
    
    const signIn = (user) => {
        dispatch({ type: 'SIGN_IN', payload: user });
        setAuthError(false);
        setError(null);
        setIsLoggedIn(true);
    };
    const authErr = (err) => {
        dispatch({ type: 'AUTH_ERR', payload: err });
        setIsLoggedIn(false);
        setAuthError(true);
        setError(err);
    };
    const signOut = () => {
      dispatch({ type: 'SIGN_OUT' });
      setIsLoggedIn(false);
    };
  
    return (
      <UserContext.Provider value={{
        user,
        isLoggedIn,
        authError,
        error,
        authErr,
        signIn,
        signOut,
      }}
      >
        {children}
      </UserContext.Provider>
    );
  };
