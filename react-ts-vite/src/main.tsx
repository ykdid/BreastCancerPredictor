import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios';

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
