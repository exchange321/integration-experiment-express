/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
import {routerActions} from 'react-router-redux';
import {TOPIC_ACTION_TYPES} from './actionTypes';
import {setNotification} from './appAction';
import * as helpers from '../helpers/helpers';

const processingSaveTopic = isSavingTopic => ({
    type: TOPIC_ACTION_TYPES.PROCESSING_SAVE_TOPIC,
    isSavingTopic,
});

const processingDeleteTopic = isDeletingTopic => ({
    type: TOPIC_ACTION_TYPES.PROCESSING_DELETE_TOPIC,
    isDeletingTopic,
});

const setErrorMessage = msg => ({
    type: TOPIC_ACTION_TYPES.SET_ERROR_MESSAGE,
    msg,
});

export const showForm = (topic = {
    name: '',
},
                         modalTitle = 'New Topic',
                         saveButtonText = 'Add Topic',
                         editingTopicId = '') => ({
    type: TOPIC_ACTION_TYPES.SHOW_FORM,
    topic,
    modalTitle,
    saveButtonText,
    editingTopicId,
});

export const hideForm = () => ({
    type: TOPIC_ACTION_TYPES.HIDE_FORM,
});

export const handleFormFieldChange = (key, value) => ({
    type: TOPIC_ACTION_TYPES.HANDLE_FORM_FIELD_CHANGE,
    key,
    value,
});

export const saveTopic = () => (
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        if (firebase.auth().currentUser) {
            const {coursesPage: {editingTopicId, modal: {topic}}} = getState();
            // Form Validation - Start
            let hasError = false;
            const msg = {};
            if (topic.name.trim().length <= 0) {
                hasError = true;
                msg.name = 'No content';
            }
            // Form Validation - End
            if (hasError) {
                dispatch(setErrorMessage(msg));
            } else {
                dispatch(processingSaveTopic(true));
                const topicId = editingTopicId || helpers.generateId(topic.name);
                firebase.helpers.set(`topics/${topicId}`, topic)
                    .then(() => {
                        dispatch(setNotification('success', 'Topic Saved.'));
                        dispatch(routerActions.push(`/courses/${topicId}`));
                        dispatch(hideForm());
                        dispatch(processingSaveTopic(false));
                    }).catch((err) => {
                    dispatch(setNotification('error', err.message));
                    dispatch(processingSaveTopic(false));
                });
            }
        } else {
            dispatch(setNotification('error', 'You are not authenticated. Please Login.'));
            dispatch(routerActions.push('/login'));
        }
    }
);

export const deleteTopic = topicIds => (
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        if (firebase.auth().currentUser) {
            const {coursesPage: {editingTopicId}} = getState();
            const nextTopicIndex = topicIds.indexOf(editingTopicId) + 1;
            let uri = '/';
            if (!topicIds || topicIds.length <= 1) {
                uri = '/courses';
            } else if (nextTopicIndex >= topicIds.length) {
                uri = `/courses/${topicIds[0]}`;
            } else {
                uri = `/courses/${topicIds[nextTopicIndex]}`;
            }
            dispatch(processingDeleteTopic(true));
            firebase.helpers.remove(`topics/${editingTopicId}`)
                .then(() => (
                    firebase.database()
                        .ref('courses')
                        .orderByChild('topic')
                        .equalTo(editingTopicId)
                        .once('value')
                ))
                .then((snapshot) => {
                    if (snapshot.val()) {
                        const coursesWithDeletedTopicId = Object.keys(snapshot.val());
                        const updates = {};
                        coursesWithDeletedTopicId.forEach((courseId) => {
                            updates[`/${courseId}`] = null;
                        });
                        return firebase.database().ref('courses').update(updates);
                    }
                    return true;
                })
                .then(() => {
                    dispatch(setNotification('success', 'Topic Deleted.'));
                    dispatch(routerActions.push(uri));
                    dispatch(hideForm());
                    dispatch(processingDeleteTopic(false));
                })
                .catch((err) => {
                    dispatch(setNotification('error', err.message));
                    dispatch(processingDeleteTopic(false));
                });
        } else {
            dispatch(setNotification('error', 'You are not authenticated. Please Login.'));
            dispatch(routerActions.push('/login'));
        }
    }
);

export default {};
