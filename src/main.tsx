import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TimerContextProvider from './Context/timer-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimerContextProvider>
      <App />
    </TimerContextProvider>
  </React.StrictMode>,
)
