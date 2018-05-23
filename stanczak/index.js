//import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Components from './components'
import { Provider } from 'react-redux'
//import store from './store'

ReactDOM.render(
      <Router>
        <Components />
      </Router>,
      document.getElementById('app')
)
console.log('running front end')
