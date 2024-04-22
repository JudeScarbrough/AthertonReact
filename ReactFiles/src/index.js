import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import "./cssFiles/root.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
  return (
    <Routes>
      <Route path="/:route" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
