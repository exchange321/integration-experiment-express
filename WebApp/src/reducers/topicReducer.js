/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import {TOPIC_ACTION_TYPES} from '../actions/actionTypes';
import initialState from './initialState';

const topicReducer = (state = initialState.coursesPage, action) => {
    switch (action.type) {
        case TOPIC_ACTION_TYPES.SHOW_FORM: {
            return {
                ...state,
                editing: true,
                modal: {
                    ...state.modal,
                    modalTitle: action.modalTitle,
                    saveButtonText: action.saveButtonText,
                    topic: action.topic,
                },
                editingTopicId: action.editingTopicId,
            };
        }
        case TOPIC_ACTION_TYPES.HIDE_FORM: {
            return {
                ...state,
                editing: false,
                modal: {
                    ...state.modal,
                    modalTitle: 'New Topic',
                    saveButtonText: 'Add Topic',
                    topic: {
                        name: '',
                    },
                    errors: {},
                    isSavingTopic: false,
                    isDeletingTopic: false,
                },
                editingTopicId: '',
            };
        }
        case TOPIC_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    topic: {
                        ...state.modal.topic,
                        [action.key]: action.value,
                    },
                },
            };
        }
        case TOPIC_ACTION_TYPES.PROCESSING_SAVE_TOPIC: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isSavingTopic: action.isSavingTopic,
                },
            };
        }
        case TOPIC_ACTION_TYPES.PROCESSING_DELETE_TOPIC: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isDeletingTopic: action.isDeletingTopic,
                },
            };
        }
        case TOPIC_ACTION_TYPES.SET_ERROR_MESSAGE: {
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

export default topicReducer;
