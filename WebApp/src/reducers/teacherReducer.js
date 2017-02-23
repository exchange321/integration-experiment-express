/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import {TEACHER_ACTION_TYPES} from '../actions/actionTypes';
import initialState from './initialState';

const teacherReducer = (state = initialState.teacherPage, action) => {
    switch (action.type) {
        case TEACHER_ACTION_TYPES.SHOW_FORM: {
            const {teacher, modalTitle, saveButtonText, editingTeacherId} = action;
            return {
                ...state,
                editing: true,
                modal: {
                    ...state.modal,
                    modalTitle,
                    saveButtonText,
                    teacher,
                },
                editingTeacherId,
            };
        }
        case TEACHER_ACTION_TYPES.HIDE_FORM: {
            return {
                ...state,
                editing: false,
                modal: {
                    ...state.modal,
                    modalTitle: 'New Teacher',
                    saveButtonText: 'Add Teacher',
                    teacher: {
                        name: '',
                        bio: '',
                        img_src: '',
                    },
                    errors: {},
                    isSavingTeacher: false,
                    isDeletingTeacher: false,
                },
                editingTeacherId: '',
            };
        }
        case TEACHER_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    teacher: {
                        ...state.modal.teacher,
                        [action.key]: action.value,
                    },
                },
            };
        }
        case TEACHER_ACTION_TYPES.RESET_NOTIFICATION: {
            return {
                ...state,
                notification: {
                    hasNotification: false,
                    type: '',
                    msg: '',
                },
            };
        }
        case TEACHER_ACTION_TYPES.PROCESSING_SAVE_TEACHER: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isSavingTeacher: action.isSavingTeacher,
                },
            };
        }
        case TEACHER_ACTION_TYPES.PROCESSING_DELETE_TEACHER: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isDeletingTeacher: action.isDeletingTeacher,
                },
            };
        }
        case TEACHER_ACTION_TYPES.SET_NOTIFICATION: {
            return {
                ...state,
                notification: {
                    hasNotification: true,
                    type: action.nocType,
                    msg: action.msg,
                },
            };
        }
        case TEACHER_ACTION_TYPES.SET_ERROR_MESSAGE: {
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

export default teacherReducer;
