import React, { useState } from 'react';

const ContextRepository = React.createContext({
  repositories: {},
  setRepositories: () => {},
});
export const ContextRepositoryProvider = (props) => {
  const [repositories, setRepositories] = useState([]);

  const contextValue = {
    repositories,
    setRepositories,
  };
  return (
    <ContextRepository.Provider value={contextValue}>
      {props.children}
    </ContextRepository.Provider>
  );
};
export default ContextRepository;
