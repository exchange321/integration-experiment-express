/**
 * Created by Wayuki on 10-Feb-17 0010.
 */
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import {helpers} from 'react-redux-firebase';

import {setNotification} from '../actions/appAction';

export const UserIsAuthenticated = UserAuthWrapper({
    wrapperDisplayName: 'UserIsAuthenticated',
    authSelector: ({firebase}) => helpers.pathToJS(firebase, 'auth'),
    authenticatingSelector: ({firebase}) => helpers.pathToJS(firebase, 'isInitializing') === true,
    predicate: auth => auth !== null,
    redirectAction: newLoc => (dispatch) => {
        dispatch(setNotification('error', 'You are not authenticated. Please login.'));
        dispatch(routerActions.replace(newLoc));
    },
});

export const UserIsNotAuthenticated = UserAuthWrapper({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    authSelector: ({firebase}) => helpers.pathToJS(firebase, 'auth'),
    authenticatingSelector: ({firebase}) => helpers.pathToJS(firebase, 'isInitializing') === true,
    predicate: auth => auth === null,
    redirectAction: newLoc => (dispatch) => {
        dispatch(setNotification('error', 'You are authenticated.'));
        dispatch(routerActions.replace(newLoc));
    },
    allowRedirectBack: false,
    failureRedirectPath: '/',
});

export const VisibleToUser = UserAuthWrapper({
    wrapperDisplayName: 'VisibleToUser',
    authSelector: ({firebase}) => helpers.pathToJS(firebase, 'auth'),
    predicate: auth => auth !== null,
    FailureComponent: null,
});

export const VisibleToGuest = UserAuthWrapper({
    wrapperDisplayName: 'VisibleToGuest',
    authSelector: ({firebase}) => helpers.pathToJS(firebase, 'auth'),
    predicate: auth => auth === null,
    FailureComponent: null,
});

export default {};
