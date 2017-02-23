/**
 * Created by Wayuki on 10-Feb-17 0010.
 */
import {LOGIN_ACTION_TYPES} from '../actions/actionTypes';
import initialState from './initialState';

const loginReducer = (state = initialState.loginPage, action) => {
    switch (action.type) {
        case LOGIN_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE: {
            return {
                ...state,
                credential: {
                    ...state.credential,
                    [action.key]: action.value,
                },
            };
        }
        case LOGIN_ACTION_TYPES.PROCESSING_LOGIN: {
            return {
                ...state,
                isLoggingIn: action.isLoggingIn,
            };
        }
        default: {
            return state;
        }
    }
};

export default loginReducer;
