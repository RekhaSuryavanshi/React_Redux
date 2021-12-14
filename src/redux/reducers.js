//import actions which we have created

import { SET_USER_NAME, SET_USER_AGE, INCREASE_AGE, DECREASE_AGE } from "./actions";

//Define the default values of this state

const initialState = {
    name: '',
    age: 0,
}

// create a function that according to the action call performs the operation we want to perform on their states
//input of the function is state and action

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload };
        case SET_USER_AGE:
            return { ...state, age: action.payload };
        case INCREASE_AGE:
            return { ...state, age: state.age + 1 };
        case DECREASE_AGE:
            return { ...state, age: state.age - 1 };
        default:
            return state;
    }
}
export default userReducer;
