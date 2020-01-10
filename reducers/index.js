import { createReducer } from 'redux-create-reducer' ;
import { createAction} from 'redux-actions';

export const initialState = { 
  enteredWebGL : false,
  device : ''
}

const ENTER_WEBGL = "enter::webgl";
const SET_DEVICE  = "set::device"

export const enterWebGl = createAction(ENTER_WEBGL);
export const setDevice  = createAction(SET_DEVICE);

const reducer = {
  [ENTER_WEBGL] : state => {
    return ({
      ...state,
      enteredWebGL : true
    })
  },  
  [SET_DEVICE] : (state, {payload}) => {
    return ({
      ...state,
      device : payload
    })
  },  
}

export default createReducer(initialState, reducer);