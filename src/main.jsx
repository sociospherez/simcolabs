import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

const savedTheme = localStorage.getItem('simcolabs-theme');
const initialNight = savedTheme === null ? true : savedTheme === 'night';

if (initialNight) {
  document.body.classList.add('night');
} else {
  document.body.classList.remove('night');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);