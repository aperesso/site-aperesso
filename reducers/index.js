import { createReducer } from 'redux-create-reducer' ;
import { createAction} from 'redux-actions';

export const initialState = { 
  webGL : null,
  enteredWebGL : false,
}

const LOAD_WEBGL = "load::webgl";
const ENTER_WEBGL = "enter::webgl";

export const loadWebGL = createAction(LOAD_WEBGL);
export const enterWebGl = createAction(ENTER_WEBGL);

const reducer = {
  [LOAD_WEBGL] : (state, {payload}) => {
    return ({
      ...state,
      webGL : payload
    })
  },
  [ENTER_WEBGL] : state => {
    return ({
      ...state,
      enteredWebGL : true
    })
  },  
}

export default createReducer(initialState, reducer);