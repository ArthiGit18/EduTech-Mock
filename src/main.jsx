import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index.scss'
import App from './App.jsx'
import { AuthModalProvider } from './context/AuthModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthModalProvider>
      <App />
    </AuthModalProvider>
  </StrictMode>,
)

