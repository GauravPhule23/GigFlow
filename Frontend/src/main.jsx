import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authContext.jsx' // Import this

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <--- CRITICAL WRAPPER */}
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>,
)