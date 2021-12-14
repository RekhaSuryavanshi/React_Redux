//TWO const values to display the type of action we want to create
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const DECREASE_AGE = 'DECREASE_AGE';

//action to save the name

export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    });
};

//action to save the age

export const setAge = age => dispatch => {
    dispatch({
        type: SET_USER_AGE,
        payload: age,
    });
};

//action to increase the age with same age input

export const increaseAge = age => dispatch => {
    dispatch({
        type: INCREASE_AGE,
        payload: age,
    });
};

//action to decrease the age with same age input

export const decreaseAge = age => dispatch => {
    dispatch({
        type: DECREASE_AGE,
        payload: age,
    });
};
