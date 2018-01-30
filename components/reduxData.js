import 'babel-polyfill'


export const types = {
  LOAD_FORMS_REQ: 'LOAD_FORMS_REQ',
  LOAD_FORMS_RES: 'LOAD_FORMS_RES',
  CLEAR_FORMS: 'CLEAR_FORMS',
  LOAD_FORMINFO_REQ: 'LOAD_FORMINFO_REQ',
  LOAD_FORMINFO_RES: 'LOAD_FORMINFO_RES',
  DELETE_FORM: 'DELETE_FORM',
  SAVE_FORM_PREV: 'SAVE_FORM_PREV',
  CHANGE_FORM_DATA: 'CHANGE_FORM_DATA',


}

export const actionCreators = {
  loadForms: () => async (dispatch, getState) => {
    dispatch({type: types.LOAD_FORMS_REQ})
    try {
      const response = await fetch('http://demo4452328.mockable.io/forms');
      const forms = await response.json()
      dispatch({type: types.LOAD_FORMS_RES, payload: forms.data})
    }

    catch (e) {
      dispatch({type: types.LOAD_FORMS_RES, payload: e, error: true})
    }

  },
  clearForms: () => async (dispatch, getState) => {
    if (getState().feed.forms.length > 0) {
      dispatch({type: types.CLEAR_FORMS})
    }
  },
  loadFormInfo: (id) => async (dispatch, getState) => {
    dispatch({type: types.LOAD_FORMINFO_REQ})
    try {
      const response = await fetch('http://demo4452328.mockable.io/forms/'+id);
      const formInfo = await response.json()

      //takes data from forms in state by id of opened form cause we need data to form header path
      const currentFormInfo=getState().feed.forms.filter((form)=>form.id==id)[0];
      const {name,image,description}=currentFormInfo

      dispatch({type: types.LOAD_FORMINFO_RES, payload:{data: formInfo.data,name:name,image:image,description:description}})
    }

    catch (e) {
      console.log(e)
      dispatch({type: types.LOAD_FORMINFO_RES, payload: e, })
    }

  },


}

const initialState = {
  feed:{
    loading: true,
    error: false,
    forms:[],
  },
  form:{
    loading: true,
    error: false,
    name: '',
    description: '',
    image: '',
    data: [],

  }

}


export const reducer = (state = initialState, action) => {
  const {type, payload, error} = action

  switch (type) {
    case types.LOAD_FORMS_REQ: {
      return {...state, feed:{...state.feed, loading: true, error: false} }
    }

    case types.LOAD_FORMS_RES: {
      if (error) {
        return {...state, feed:{...state.feed, loading: false, error: true } }
      }
      return {...state, feed:{ loading: false, error: false, forms:payload } }
    }

    case types.CLEAR_FORMS: {
      return {...state, feed:{ ...state.feed, forms: [] } }
    }
    case types.DELETE_FORM: {
      return {...state, feed:{ ...state.feed, forms: [    ...state.feed.forms.slice(0, action.payload), ...state.feed.forms.slice(action.payload + 1)] } }
    }
    case types.LOAD_FORMINFO_REQ: {
      return {...state, form:{...state.form, loading: true, error: false} }
    }

    case types.LOAD_FORMINFO_RES: {
      if (error) {
        return {...state, form:{...state.form, loading: false, error: true } }
      }
      const {data,name,description,image}=payload;


      return {...state, form:{...state.form, loading: false, error: false, data:data,name:name,image:image,description:description } }
    }
    case types.SAVE_FORM_PREV: {
      const {name,description,image}=payload;
      return {...state, form:{...state.form, name:name, description:description, image:image}}

    }
    case types.CHANGE_FORM_DATA:{
      const {index,val}=payload;
      var newData=state.form.data.slice();
      newData[index]={...newData[index], value:val}
      return {...state, form:{...state.form, data:newData}}
    }





    default : return state;
  }

}
