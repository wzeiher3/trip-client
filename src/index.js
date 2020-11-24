import 'unfetch/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import {TripProvider} from './contexts/TripContext'
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import App from './components/App/App'
import './setup-icons'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <TripProvider>
        {/* <ErrorBoundary> */}
        <App />
        {/* </ErrorBoundary> */}
      </TripProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()
