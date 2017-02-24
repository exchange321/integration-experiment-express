/**
 * Created by Wayuki on 08-Feb-17 0008.
 */
import { APP_ACTION_TYPES } from '../actions/actionTypes';
import initialState from './initialState';

const notificationReducer = (state = initialState.appPage, action) => {
    switch (action.type) {
        case APP_ACTION_TYPES.SET_NOTIFICATION: {
            return {
                ...state,
                notification: {
                    ...state.notification,
                    hasNotification: true,
                    type: action.nocType,
                    msg: action.msg,
                },
            };
        }
        case APP_ACTION_TYPES.RESET_NOTIFICATION: {
            return {
                ...state,
                notification: {
                    ...state.notification,
                    hasNotification: false,
                    type: '',
                    msg: '',
                },
            };
        }
        case APP_ACTION_TYPES.SET_REDIRECT: {
            return {
                ...state,
                redirect: {
                    ...state.redirect,
                    hasRedirect: true,
                    uri: action.uri,
                },
            };
        }
        case APP_ACTION_TYPES.RESET_REDIRECT: {
            return {
                ...state,
                redirect: {
                    ...state.redirect,
                    hasRedirect: false,
                    uri: '',
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default notificationReducer;
