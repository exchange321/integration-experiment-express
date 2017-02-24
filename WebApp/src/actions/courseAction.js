/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import {routerActions} from 'react-router-redux';
import {COURSE_ACTION_TYPES} from './actionTypes';
import {setNotification} from './appAction';
import * as helpers from '../helpers/helpers';

const processingSaveCourse = isSavingCourse => ({
    type: COURSE_ACTION_TYPES.PROCESSING_SAVE_COURSE,
    isSavingCourse,
});

const processingDeleteCourse = isDeletingCourse => ({
    type: COURSE_ACTION_TYPES.PROCESSING_DELETE_COURSE,
    isDeletingCourse,
});

const setErrorMessage = msg => ({
    type: COURSE_ACTION_TYPES.SET_ERROR_MESSAGE,
    msg,
});

export const showForm = (course = {
    title: '',
    description: '',
    img_src: '',
    topic: '',
},
                         modalTitle = 'New Course',
                         saveButtonText = 'Add Course',
                         editingCourseId = '') => ({
    type: COURSE_ACTION_TYPES.SHOW_FORM,
    course,
    modalTitle,
    saveButtonText,
    editingCourseId,
});

export const hideForm = () => ({
    type: COURSE_ACTION_TYPES.HIDE_FORM,
});

export const handleFormFieldChange = (key, value) => ({
    type: COURSE_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE,
    key,
    value,
});

export const saveCourse = () => (
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        if (firebase.auth().currentUser) {
            const {coursePage: {editingCourseId, modal: {course}}} = getState();

            // Form Validation - Start
            let hasError = false;
            const msg = {};

            if (course.title.trim().length <= 0) {
                hasError = true;
                msg.title = 'No content.';
            }
            if (course.description.trim().length <= 0) {
                hasError = true;
                msg.description = 'No content.';
            }
            if (course.img_src.trim().length <= 0) {
                hasError = true;
                msg.img_src = 'No content.';
            }
            if (course.topic.trim().length <= 0) {
                hasError = true;
                msg.topic = 'No content.';
            }
            // Form Validation - End

            if (hasError) {
                dispatch(setErrorMessage(msg));
            } else {
                dispatch(processingSaveCourse(true));
                const courseId = editingCourseId || helpers.generateId(course.title);
                firebase.helpers.set(`courses/${courseId}`, course)
                    .then(() => {
                        dispatch(setNotification('success', 'Course Saved.'));
                        dispatch(hideForm());
                        dispatch(processingSaveCourse(false));
                    }).catch((err) => {
                    dispatch(setNotification('error', err.message));
                    dispatch(processingSaveCourse(false));
                });
            }
        } else {
            dispatch(setNotification('error', 'You are not authenticated. Please Login.'));
            dispatch(routerActions.push('/login'));
        }
    }
);

export const deleteCourse = () => (
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        if (firebase.auth().currentUser) {
            dispatch(processingDeleteCourse(true));
            const {coursePage: {editingCourseId}} = getState();
            firebase.helpers.remove(`courses/${editingCourseId}`)
                .then(() => {
                    dispatch(setNotification('success', 'Course Deleted.'));
                    dispatch(hideForm());
                    dispatch(processingDeleteCourse(false));
                }).catch((err) => {
                dispatch(setNotification('error', err.message));
                dispatch(processingDeleteCourse(false));
            });
        } else {
            dispatch(setNotification('error', 'You are not authenticated. Please Login.'));
            dispatch(routerActions.push('/login'));
        }
    }
);

export default {};
