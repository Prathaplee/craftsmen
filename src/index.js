import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional: Add global styles
import App from './app'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Optional

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: Measure performance in your app
reportWebVitals();
