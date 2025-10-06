import './polyfills'
import './styles/index.css'

import { createRoot } from 'react-dom/client'
import App from './App'

function render() {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found')
    return
  }

  console.log('Root element found, rendering React app...')

  const root = createRoot(rootElement)

  root.render(<App />)

  console.log('React app rendered successfully')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render)
} else {
  render()
}
