import React, {useState} from 'react';

const ContextLoading = React.createContext({
  loading: Boolean,
  setLoading: () => {},
});
export const ContextLoadingProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const contextValue = [loading, setLoading];
  return (
    <ContextLoading.Provider value={contextValue}>
      {props.children}
    </ContextLoading.Provider>
  );
};
export default ContextLoading;
