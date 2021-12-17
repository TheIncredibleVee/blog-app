import React, { useReducer, createContext , useState} from 'react';

const initialState =window.location.pathname;

export const PathContext = createContext(initialState);


export const PathProvider = ({ children }) => {
    
    const [path, setPath] = useState(initialState);
    
    return (
      <PathContext.Provider value={{
        path,
        setPath,
      }}
      >
        {children}
      </PathContext.Provider>
    );
  };