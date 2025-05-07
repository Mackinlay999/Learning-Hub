import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import "./style/index.css"
import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
);
