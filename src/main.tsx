import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { setup } from './lib/ajax'

setup()
const div = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(div)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
export { div as rootDiv }

