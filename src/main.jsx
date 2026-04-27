import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const el = document.getElementById('ezon-finder');
if (el) ReactDOM.createRoot(el).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
