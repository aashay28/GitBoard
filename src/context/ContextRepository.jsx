import React, { useState } from 'react';

const ContextRepository = React.createContext({
  repositories: {},
  setRepositories: () => {},
  userDetail: {},
  setUserDetail: () => {},
});
export const ContextRepositoryProvider = (props) => {
  const [repositories, setRepositories] = useState([]);
  const [userDetail, setUserDetail] = useState();

  const contextValue = {
    repositories,
    setRepositories,
    userDetail,
    setUserDetail,
  };
  return (
    <ContextRepository.Provider value={contextValue}>
      {props.children}
    </ContextRepository.Provider>
  );
};
export default ContextRepository;
