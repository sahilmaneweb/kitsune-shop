import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import ScrollToTop from './components/ScrollToTop.jsx'
import { ShopContextProvider } from './context/ShopContext.jsx'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <BrowserRouter >
        <ScrollToTop />
        <App />
        <Toaster position='top-right' reverseOrder={false} />
      </BrowserRouter>
    </ShopContextProvider>
  </StrictMode>,
)
