
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
require('../styles/header.scss');
export default class Header extends Component {
    render () {
        return (
          <header>
            <div className="navigation">
              <ul className="navigation__list">
                <li className="navigation__list__item"><Link to='/'>Forms feed</Link></li>
              </ul>
            </div>
          </header>
        )
    }
}
