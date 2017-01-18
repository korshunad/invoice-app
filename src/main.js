import React from 'react'
import AllInvoices from './components/AllInvoices'
import SignUp from './components/SignUp'
import {render} from 'react-dom'
import App from './containers/App'
import 'babel-polyfill'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import api from './redux/modules/api'
import { Router, Route, browserHistory } from 'react-router';

const invoicesState = combineReducers({
  api,
});

let store = createStore(invoicesState, applyMiddleware(thunk));

render(
  <Provider store={store} key='provider'>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
      <Route path="allinvoices" component={AllInvoices} />
      <Route path="/:id" component={App} />
      <Route path="signup" component={SignUp} />
    </Router>
  </Provider>,
  document.getElementById('container')
)


