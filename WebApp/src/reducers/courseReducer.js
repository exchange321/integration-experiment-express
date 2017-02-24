/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import { COURSE_ACTION_TYPES } from '../actions/actionTypes';
import initialState from './initialState';

const courseReducer = (state = initialState.coursePage, action) => {
    switch (action.type) {
        case COURSE_ACTION_TYPES.SHOW_FORM: {
            return {
                ...state,
                editing: true,
                modal: {
                    ...state.modal,
                    modalTitle: action.modalTitle,
                    saveButtonText: action.saveButtonText,
                    course: action.course,
                },
                editingCourseId: action.editingCourseId,
            };
        }
        case COURSE_ACTION_TYPES.HIDE_FORM: {
            return {
                ...state,
                editing: false,
                modal: {
                    ...state.modal,
                    modalTitle: 'New Course',
                    saveButtonText: 'Add Course',
                    course: {
                        title: '',
                        description: '',
                        img_src: '',
                        topic: '',
                    },
                    errors: {},
                    isSavingCourse: false,
                    isDeletingCourse: false,
                },
                editingCourseId: '',
            };
        }
        case COURSE_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    course: {
                        ...state.modal.course,
                        [action.key]: action.value,
                    },
                },
            };
        }
        case COURSE_ACTION_TYPES.PROCESSING_SAVE_COURSE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isSavingCourse: action.isSavingCourse,
                },
            };
        }
        case COURSE_ACTION_TYPES.PROCESSING_DELETE_COURSE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isDeletingCourse: action.isDeletingCourse,
                },
            };
        }
        case COURSE_ACTION_TYPES.SET_ERROR_MESSAGE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    errors: action.msg,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default courseReducer;
