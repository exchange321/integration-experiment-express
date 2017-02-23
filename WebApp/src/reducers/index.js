/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import {combineReducers} from 'redux';
import {firebaseStateReducer} from 'react-redux-firebase';
import {routerReducer} from 'react-router-redux';
import teacherPage from './teacherReducer';
import appPage from './appReducer';
import coursesPage from './topicReducer';
import coursePage from './courseReducer';
import loginPage from './loginReducer';

const rootReducer = combineReducers({
    appPage,
    teacherPage,
    coursesPage,
    coursePage,
    loginPage,
    firebase: firebaseStateReducer,
    routing: routerReducer,
});

export default rootReducer;
