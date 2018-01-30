import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider,connect } from 'react-redux'
import { reducer,actionCreators } from './reduxData'
import { BrowserRouter } from 'react-router-dom';
import Header from './Header'
import Main from './Main'


const store = createStore(reducer, applyMiddleware(thunk))


class App extends Component {
    render () {
        return (
          <div className="app">
            <Header />
            <Main/>

          </div>
          )
    }
}



const AppWithStore = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)


export default AppWithStore
