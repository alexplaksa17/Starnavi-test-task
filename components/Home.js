import React, {Component} from 'react';
require('../styles/home.scss');
import FormPrev from './FormPrev'
import { connect } from 'react-redux'
import { types,actionCreators } from './reduxData'

const mapStateToProps = (state) => ({
  loading: state.feed.loading,
  error: state.feed.error,
  forms: state.feed.forms,
})


class Home extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  onDeleteClick=(index)=>{
    const {dispatch} = this.props
    dispatch( { type: types.DELETE_FORM, payload: index } );

  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actionCreators.loadForms())
  }



  render () {
    const {loading, error, forms} = this.props
    const renderedForms=forms.map((form,index)=>{
      return (<FormPrev key={form.id}
        index={index}
        id={form.id}
        name={form.name}
        image={form.image}
        description={form.description}
        onDeleteClick={this.onDeleteClick}
      />)
       })


    if (loading) {
      return(
        <h1>Still loads</h1> //may change it to loader animaton

      )
    }
    if(error){
      return(
        <h1>Error while data loading</h1>

      )
    }
    return (
      <div className="home">
        <h1>Forms</h1>
        <div className="feed">
          {renderedForms}

        </div>
      </div>
    );



    }
}

export default connect(mapStateToProps)(Home)
