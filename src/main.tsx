import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/Auth'; 
import { SearchProvider } from './contexts/SearcContect';


const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
       
      <AuthProvider>
        <SearchProvider>
        <App />
        </SearchProvider>
      </AuthProvider>
      
    </React.StrictMode>
  );
}
