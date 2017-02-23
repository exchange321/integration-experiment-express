/**
 * Created by Wayuki on 08-Feb-17 0008.
 */
import React, {Component, PropTypes} from 'react';
import {Button, ButtonGroup} from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {firebaseConnect, helpers} from 'react-redux-firebase';

import * as topicActions from '../../actions/topicAction';
import {showForm} from '../../actions/courseAction';

import NavLink from '../common/NavLink.jsx';
import ModalContainer from '../common/ModalContainer.jsx';
import TopicForm from './TopicForm.jsx';

import {VisibleToUser} from '../../auth/auth';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebaseConnect([
    'topics',
])
@connect(
    ({firebase, coursesPage}) => ({
        topics: dataToJS(firebase, 'topics'),
        auth: pathToJS(firebase, 'auth'),
        ...coursesPage,
    }),
    dispatch => ({
        actions: bindActionCreators(topicActions, dispatch),
        courseActions: bindActionCreators({showForm}, dispatch),
    }),
)
class CoursesPage extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            uid: PropTypes.string.isRequired,
        }),
        children: PropTypes.element,
        params: PropTypes.shape({
            topic: PropTypes.string,
        }).isRequired,
        topics: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired),
        editing: PropTypes.bool.isRequired,
        modal: PropTypes.shape({
            modalTitle: PropTypes.string.isRequired,
            saveButtonText: PropTypes.string.isRequired,
            topic: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            errors: PropTypes.objectOf(
                PropTypes.string.isRequired,
            ).isRequired,
            isSavingTopic: PropTypes.bool.isRequired,
            isDeletingTopic: PropTypes.bool.isRequired,
        }).isRequired,
        editingTopicId: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            showForm: PropTypes.func.isRequired,
            hideForm: PropTypes.func.isRequired,
            handleFormFieldChange: PropTypes.func.isRequired,
            saveTopic: PropTypes.func.isRequired,
            deleteTopic: PropTypes.func.isRequired,
        }).isRequired,
        courseActions: PropTypes.shape({
            showForm: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        children: (
        < div / >
),
    topics: undefined
,
    auth: null
,
}
;

showForm = (e, topicId) => {
    e.preventDefault();
    if (this.props.auth && this.props.auth !== null) {
        if (topicId) {
            const topic = this.props.topics[topicId];
            this.props.actions.showForm(topic, `Edit ${topic.name}`, 'Save Changes', topicId);
        } else {
            this.props.actions.showForm();
        }
    }
};

handleFormFieldChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    this.props.actions.handleFormFieldChange(key, value);
};

handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.actions.saveTopic();
};

handleTopicDelete = () => {
    this.props.actions.deleteTopic(Object.keys(this.props.topics));
};

renderFormSubmitButton = () => {
    const {modal: {saveButtonText, isSavingTopic}} = this.props;
    return isSavingTopic ? (
        < Button
        className = "btn-topic-submit loading"
    type = "submit"
    color = "primary"
    disabled
    >
    Processing
    ...
    </
    Button >
    ) :
    (
    < Button
    className = "btn-topic-submit"
    type = "submit"
    color = "primary"
        >
        {saveButtonText}
        < / Button >
    )
    ;
};

renderFormDeleteButton = () => {
    const {editingTopicId, modal: {isDeletingTopic}} = this.props;
    if (!editingTopicId) {
        return null;
    }
    return isDeletingTopic ? (
        < Button
        className = "btn-topic-delete loading"
    type = "button"
    outline
    color = "danger"
    disabled
    >
    Processing
    ...
    </
    Button >
    ) :
    (
    < Button
    className = "btn-topic-delete"
    type = "button"
    outline
    color = "danger"
    onClick = {this.handleTopicDelete
}
    >
    Delete
    Topic
    < / Button >
    )
    ;
};

render()
{
    const {topics, children, editing, modal, actions, courseActions} = this.props;
    return (
        < div
    className = "main-content courses" >
        < div
    className = "course-header clearfix" >
        < h2 > Courses < / h2 >
        < ul
    className = "course-nav" >
        {
            isLoaded(topics) && !isEmpty(topics) &&
        Object.keys(topics).map(topicId => (
        < li
    key = {topicId} >
        < NavLink
    to = {`/courses/${topicId}`
}>
    {
        topics[topicId].name
    }
</
    NavLink >
    < / li >
))
}
    {
        React.createElement(
            VisibleToUser(
                () => (
                < li
        className = "add-topic" >
            < a
        href = "/"
        onClick = {e
    =>
        this.showForm(e)
    }>
        +Add
        Topic < / a >
        < / li >
    ),
    ),
    )
    }
</
    ul >
    < / div >
    {children && React.cloneElement(children, {topics})
}
    {
        React.createElement(
            VisibleToUser(
                () => (
                < div
        className = "btn-container text-right" >
            < ButtonGroup >
            {
                isLoaded(topics) &&
            this.props.params.topic &&
            Object.keys(topics).includes(this.props.params.topic) &&
            < Button
        onClick = {
            e
    =>
        this.showForm(e, this.props.params.topic)
    }
        type = "button"
        outline
        color = "primary"
            >
            Edit
        Topic
        < / Button >
    }
        {
            isLoaded(topics) && !isEmpty(topics) &&
            Object.keys(topics).length > 0 &&
            < Button
            onClick = {
                this.props.auth && this.props.auth !== null ?
                () => courseActions.showForm() : () => {
                }
        }
            type = "button"
            color = "primary"
                >
                Add
            Course
            < / Button >
        }
    </
        ButtonGroup >
        < / div >
    ),
    ),
    )
    }
<
    ModalContainer
    isOpen = {editing}
    toggle = {actions.hideForm
}
    handleFormSubmit = {this.handleFormSubmit
}
    title = {modal.modalTitle
}
    bodyContent = {
        < TopicForm
    name = {modal.topic.name
}
    errors = {modal.errors
}
    onChange = {this.handleFormFieldChange
}
/>
}
    footerContent = {
        React.createElement(
        VisibleToUser(
            () => (
            < ButtonGroup >
            {this.renderFormDeleteButton()
}
    {
        this.renderFormSubmitButton()
    }
</
    ButtonGroup >
),
),
)
}
/>
</
    div >
)
    ;
}

}

export default CoursesPage;
