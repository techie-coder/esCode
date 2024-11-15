import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-skne2ots1cwlwxnk.us.auth0.com"
    clientId="8woOTWWZexdwsfF1tARAuLJpmMqgb4cg"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
