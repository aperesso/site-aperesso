import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer, { initialState as  defaultInitialState } from '../reducers/index';

export const initializeStore = (initialState = defaultInitialState) => createStore(
	reducer,
	initialState,
	composeWithDevTools(
		applyMiddleware(thunkMiddleware),
	)
);