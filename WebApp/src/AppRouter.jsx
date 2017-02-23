import React from 'react';
import {Route, IndexRoute, Redirect, Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import App from './components/App.jsx';

import HomePage from './components/home/HomePage.jsx';
import AboutPage from './components/about/AboutPage.jsx';
import TeachersPage from './components/teachers/TeachersPage.jsx';
import CoursesPage from './components/courses/CoursesPage.jsx';
import CoursePage from './components/courses/course/CoursePage.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import LogoutPage from './components/logout/LogoutPage.jsx';

const AppRouter = ({store}) => {
    const history = syncHistoryWithStore(browserHistory, store);
    return (
        < Router
    history = {history} >
        < Route
    component = {App} >
        < Route
    path = "/"
    component = {HomePage} / >
        < Route
    path = "about"
    component = {AboutPage} / >
        < Route
    path = "teachers"
    component = {TeachersPage} / >
        < Route
    path = "courses"
    component = {CoursesPage} >
        < IndexRoute
    component = {CoursePage} / >
        < Route
    path = "(:topic)"
    component = {CoursePage} / >
        < / Route >
        < Route
    path = "login"
    component = {LoginPage} / >
        < Route
    path = "logout"
    component = {LogoutPage} / >
        < Redirect
    from = "*"
    to = "/"
    component = {HomePage} / >
        < / Route >
        < / Router >
    )
    ;
};

export default AppRouter;
