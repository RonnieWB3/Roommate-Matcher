import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Tailwind and global styles
import App from './App.tsx'; // Import App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);
