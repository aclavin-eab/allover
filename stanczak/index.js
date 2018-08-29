//import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import store from './store'
import Artwork from './components/artwork'

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)
