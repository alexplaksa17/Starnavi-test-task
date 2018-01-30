import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import Home from './Home'
import Form from './Form'

require('../styles/main.scss');
export default class Main extends Component {
    render () {
        return (
          <main>
            <Route exact path='/' component={Home}/>
            <Route path='/form/:number' component={Form}/>
          </main>
        )
    }
}
