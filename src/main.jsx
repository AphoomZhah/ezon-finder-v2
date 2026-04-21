import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const el = document.getElementById('ezon-finder');
if (el) ReactDOM.createRoot(el).render(<App />);
