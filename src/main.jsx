import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import {QueryParamProvider} from 'use-query-params';
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6';
import {ContextRepositoryProvider} from './context/ContextRepository';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <ContextRepositoryProvider>
          <App />
        </ContextRepositoryProvider>
      </QueryParamProvider>
    </Router>
  </React.StrictMode>
);
