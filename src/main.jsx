import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// index.html carries default description/canonical/Open Graph tags for link
// previews (WhatsApp, Facebook) that don't run JavaScript. Once the app runs,
// each page sets its own via <SEO>, so drop the defaults to avoid duplicates.
document.querySelectorAll('head [data-seo-default]').forEach(el => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
