import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyToDocument } from './game/motion'

applyToDocument()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Pages pre-rendered at build time (scripts/prerender.mjs) mark which route
// they contain; hydrate those, and render everything else from scratch.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
if (root.dataset.route === path) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
