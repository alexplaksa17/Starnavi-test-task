import React, {Component} from 'react';
require('../styles/form.scss');
import { connect } from 'react-redux'
import { types,actionCreators } from './reduxData'

class FormFieldData extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {index,type,value,handleChange,handleCheckBox,handleListElemChange}=this.props;

    var dataInfo;

    if (type==="integer"){
      dataInfo=<input type="text" pattern="[0-9]*" onChange={(e) => handleChange(index,value,e)} value={value} />
    }
    if (type==="double"){
      dataInfo=<input type="number" step="any" onChange={(e) => handleChange(index,value,e)} value={value} />
    }
    if (type==="string"){
      dataInfo=<input type="text" onChange={(e) => handleChange(index,value,e)} value={value}/>
    }
    if (type==="text"){
      dataInfo=<textarea onChange={(e) => handleChange(index,value,e)}  value={value}/>
    }
    if (type==="bool"){
      dataInfo=<input type="checkBox" className="boolValue" onChange ={(e) => handleCheckBox(index,value,e)}  checked={value}/>
    }
    if (type==="list"){
      dataInfo=value.map((elem,indexInList)=>{
        return(
          <li key={indexInList}>
            <input type="text"  onChange={(e) => handleListElemChange(index,indexInList,elem,value,e)} value={elem}/>

          </li>
        )
      });
    }
    return(
      <div className="formField__value">
        {dataInfo}
      </div>

    )

  }
}


class FormField extends Component{
  constructor(props){
    super(props);



  }
  render(){
    const {data,index,handleChange,handleCheckBox,handleListElemChange}=this.props;


    return(
      <div className="formField">
        <span classNmae="formField__label">
          {data.label}
        </span>
        <FormFieldData type={data.type} index={index} handleChange={handleChange} value={data.value || data.values} handleCheckBox={handleCheckBox} handleListElemChange={handleListElemChange}/>
      </div>
    )

  }
}






const mapStateToProps = (state) => ({
  loading: state.form.loading,
  error: state.form.error,
  form: state.form,

})
class Form extends Component {
  constructor(props){
    super(props);
    this.state={


    }
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actionCreators.loadFormInfo(this.props.match.params.number))
  }
  handleChange=(index,prevValue,evt)=> {
    const val = (evt.target.validity.valid) ? evt.target.value : prevValue;
    const {dispatch} = this.props;
    dispatch({type:types.CHANGE_FORM_DATA, payload:{index,val}})
  }
  handleCheckBox=(index,prevValue,evt)=>{
    const val= !prevValue;
    const {dispatch} = this.props;
    dispatch({type:types.CHANGE_FORM_DATA, payload:{index,val}})
  }
  handleListElemChange=(index,indexInList,prevValue,list,evt)=>{
    const el = (evt.target.validity.valid) ? evt.target.value : prevValue;
    var val=list.slice();
    val[indexInList]=el;
    const {dispatch} = this.props;
    dispatch({type:types.CHANGE_FORM_DATA, payload:{index,val}})
  }




  render () {
    const {loading, error, form} = this.props;
    const {name,description,image,data}=form;
    const formFields=data.map((property,index)=><FormField key={index} index={index} data={property} handleChange={this.handleChange} handleCheckBox={this.handleCheckBox} handleListElemChange={this.handleListElemChange}/>)


    if (loading) {
      return(
        <h1>Data loading</h1>

      )
    }
    if(error){
      return(
        <h1>Error! Seems like you haven`t been on home page yet,please follow link in header</h1>

      )
    }
    return (
      <div className="form">
        <h1>Form info</h1>
        <div className="formInfo">

          <div className="formInfo__head">
            <div className="formInfo__head__text">
              <span>{name}</span>
              <p>{description}</p>
            </div>
            <div className="formInfo__head__image">
              <img src={image} alt="form image"/>
            </div>
          </div>
          <hr className="formInfo__line"/>
          {formFields}






        </div>
      </div>
    );




  }
}

export default connect(mapStateToProps)(Form)
