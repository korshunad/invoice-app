import React from 'react'
import {render} from 'react-dom'
import App from './containers/App'
import 'babel-polyfill'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'



render(
    <App/>,
  document.getElementById('container')
)


