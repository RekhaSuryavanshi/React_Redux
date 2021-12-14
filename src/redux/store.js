//import 3 fucns createStore, combineReducers, applyMiddleware
//import thunk as middleware
//import userReducer from reducers.js

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import userReducer from "./reducers";

//created const rootReducer to combine all the created reducers

const rootReducer = combineReducers({ userReducer });

// create store using rootReducer and thunk as middleware
export const Store = createStore(rootReducer, applyMiddleware(thunk));



