/**
 * Created by Wayuki on 10-Feb-17 0010.
 */
import { routerActions } from 'react-router-redux';

import { LOGIN_ACTION_TYPES } from './actionTypes';
import { setNotification } from './appAction';

const processingLogin = isLoggingIn => ({
    type: LOGIN_ACTION_TYPES.PROCESSING_LOGIN,
    isLoggingIn,
});

export const handleFormFieldChange = (key, value) => ({
    type: LOGIN_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE,
    key,
    value,
});

export const handleLogin = () => (
    (dispatch, getState, getFirebase) => {
        dispatch(processingLogin(true));
        const { loginPage: { credential } } = getState();
        const firebase = getFirebase();
        firebase.login(credential).then(() => {
            dispatch(processingLogin(false));
            dispatch(setNotification('success', 'Logged In.'));
            dispatch(routerActions.replace('/'));
        }).catch((err) => {
            dispatch(processingLogin(false));
            dispatch(setNotification('error', err.message));
        });
    }
);

export default {};
