import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Clear any stale v1/v2 cached data so new members (Hansul etc.) always appear
['socflow_mic_state_v1','socflow_mic_state_v2','socflow_mic_current_user_v1','socflow_mic_current_user_v2'].forEach(k => localStorage.removeItem(k));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
