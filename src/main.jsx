import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importa las funcionalidades JavaScript de Bootstrap (como el navbar responsive)
import '@fontsource/lora';  // Fuente Lora para títulos
import '@fontsource/roboto';  // Fuente Roboto para texto general

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
