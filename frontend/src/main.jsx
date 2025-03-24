import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { FormProvider } from './context/FormContext'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormProvider>
      <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
      </BrowserRouter>
    </FormProvider>
  </StrictMode>,
)
