/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import {routerActions} from 'react-router-redux';
import {TEACHER_ACTION_TYPES} from './actionTypes';
import {setNotification} from './appAction';
import * as helpers from '../helpers/helpers';

const processingSaveTeacher = isSavingTeacher => ({
    type: TEACHER_ACTION_TYPES.PROCESSING_SAVE_TEACHER,
    isSavingTeacher,
});

const processingDeleteTeacher = isDeletingTeacher => ({
    type: TEACHER_ACTION_TYPES.PROCESSING_DELETE_TEACHER,
    isDeletingTeacher,
});

const setErrorMessage = msg => ({
    type: TEACHER_ACTION_TYPES.SET_ERROR_MESSAGE,
    msg,
});

export const showForm = (teacher = {
    name: '',
    bio: '',
    img_src: '',
},
                         modalTitle = 'New Teacher',
                         saveButtonText = 'Add Teacher',
                         editingTeacherId = '',) => ({
    type: TEACHER_ACTION_TYPES.SHOW_FORM,
    teacher,
    modalTitle,
    saveButtonText,
    editingTeacherId,
});

export const hideForm = () => (
    {
        type: TEACHER_ACTION_TYPES.HIDE_FORM,
    }
);

export const handleFormFieldChange = (key, value) => (
    {
        type: TEACHER_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE,
        key,
        value,
    }
);

export const saveTeacher = () => (
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        if (firebase.auth().currentUser) {
            const {teacherPage: {editingTeacherId, modal: {teacher}}} = getState();

            // Form Validation - Start
            let hasError = false;
            const msg = {};
            if (teacher.name.trim().length <= 0) {
                hasError = true;
                msg.name = 'No content';
            }
            if (teacher.bio.trim().length <= 0) {
                hasError = true;
                msg.bio = 'No content';
            }
            if (teacher.img_src.trim().length <= 0) {
                hasError = true;
                msg.img_src = 'No content';
            }
            // Form Validation - End

            if (hasError) {
                dispatch(setErrorMessage(msg));
            } else {
                dispatch(processingSaveTeacher(true));
                const teacherId = editingTeacherId || helpers.generateId(teacher.name);
                firebase.helpers.set(`teachers/${teacherId}`, teacher)
                    .then(() => {
                        dispatch(setNotification('success', 'Teacher Saved.'));
                        dispatch(hideForm());
                        dispatch(processingSaveTeacher(false));
                    }).catch((err) => {
                    dispatch(setNotification('error', err.message));
                    dispatch(processingSaveTeacher(false));
                });
            }
        } else {
            dispatch(setNotification('error', 'You are not authenticated. Please Login.'));
            dispatch(routerActions.push('/login'));
        }
    }
);

export const deleteTeacher = () => (
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        if (firebase.auth().currentUser) {
            const {teacherPage: {editingTeacherId}} = getState();
            dispatch(processingDeleteTeacher(true));
            firebase.helpers.remove(`teachers/${editingTeacherId}`)
                .then(() => {
                    dispatch(setNotification('success', 'Teacher Deleted.'));
                    dispatch(hideForm());
                    dispatch(processingDeleteTeacher(false));
                }).catch((err) => {
                dispatch(setNotification('error', err.message));
                dispatch(processingDeleteTeacher(false));
            });
        } else {
            dispatch(setNotification('error', 'You are not authenticated. Please Login.'));
            dispatch(routerActions.push('/login'));
        }
    }
);

export default {};
