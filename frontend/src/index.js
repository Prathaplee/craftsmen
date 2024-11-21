import React from 'react';
import ReactDOM from 'react-dom/client'; // for React 18+
// import './index.css'; // Optional, you can use this for global styles
import App from './App'; // This imports your main app component
import reportWebVitals from './reportWebVitals'; // Optional for performance monitoring

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root element for the React app
root.render(
  <React.StrictMode>
    <App /> {/* Rendering the App component here */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
