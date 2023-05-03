import React, { useState } from 'react';

const ContextRepositery = React.createContext({
  repositories: {},
  setRepositories: () => {},
});
export const ContextRepositeryProvider = (props) => {
  const [repositories, setRepositories] = useState([]);

  const contextValue = {
    repositories,
    setRepositories,
  };
  return (
    <ContextRepositery.Provider value={contextValue}>
      {props.children}
    </ContextRepositery.Provider>
  );
};
export default ContextRepositery;
