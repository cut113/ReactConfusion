import * as types from './actionTypes';

export const addFeedback = ( state = {
    errMess: null,
    feedback: []
}, action) => {
    switch (action.type) {
        case types.ADD_FEEDBACK:
            return {...state, isLoading: false, errMess: null, feedback: action.payload};
        case types.ADD_FEEDBACK:
            var feedback = action.payload;
            return {...state, feedback: state.feedback.concat(feedback)};
        case types.FEEDBACK_FAILED:
            return {...state, errMess: action.payload};
        default:
            return state;
    }
}