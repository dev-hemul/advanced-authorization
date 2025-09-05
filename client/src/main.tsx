import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Context, store } from './context';

const container = document.getElementById('root') as HTMLElement;
if (!container) throw new Error("Root container not found");

createRoot(container).render(
  <StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </StrictMode>
);