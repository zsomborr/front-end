import React, { useState } from "react";

export const UserContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const UserContextProvider = (props) => {
  const setIsAuthenticated = (value) => {
    setState({ ...state, isAuthenticated: value });
  };

  const initState = {
    isAuthenticated: false,
    setIsAuthenticated: setIsAuthenticated,
  };

  const [state, setState] = useState(initState);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
