import React, {Component} from 'react';
import {Link} from 'react-router-dom'
require('../styles/formprev.scss');
export default class FormPrev extends Component{


  render() {
    const {index,id,image,name,description,onDeleteClick}=this.props;

    return(
      <div className="formWrapper">
        <div className="formBlock" >
          <div className="formBlock__image">
            <img src={image} alt="form image"/>
          </div>
          <div className="formBlock__text">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <div className="formBlock__buttons">
            <button onClick={() => onDeleteClick(index)}>Delete</button>
            <button><Link to={`/form/${id}`}>View</Link></button>

          </div>
        </div>
      </div>
    )
  }
}
