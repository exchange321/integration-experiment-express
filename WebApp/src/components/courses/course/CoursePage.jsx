/**
 * Created by Wayuki on 08-Feb-17 0008.
 */
import React, {Component, PropTypes} from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {firebaseConnect, helpers} from 'react-redux-firebase';

import * as courseActions from '../../../actions/courseAction';

import ModalContainer from '../../common/ModalContainer.jsx';
import Course from './Course.jsx';
import CourseForm from './CourseForm.jsx';

import {VisibleToUser} from '../../../auth/auth';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebaseConnect(({params: {topic = ''}}) => ([
    topic ? `courses#orderByChild=topic&equalTo=${topic}` : 'courses',
]))
@connect(
    ({firebase, coursePage}) => ({
        courses: dataToJS(firebase, 'courses'),
        auth: pathToJS(firebase, 'auth'),
        ...coursePage,
    }),
    dispatch => ({
        actions: bindActionCreators(courseActions, dispatch),
    }),
)
class CoursePage extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            uid: PropTypes.string.isRequired,
        }),
        topics: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired),
        courses: PropTypes.objectOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                img_src: PropTypes.string.isRequired,
                topic: PropTypes.string.isRequired,
            }).isRequired,
        ),
        editing: PropTypes.bool.isRequired,
        modal: PropTypes.shape({
            modalTitle: PropTypes.string.isRequired,
            saveButtonText: PropTypes.string.isRequired,
            course: PropTypes.shape({
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                img_src: PropTypes.string.isRequired,
                topic: PropTypes.string.isRequired,
            }).isRequired,
            errors: PropTypes.objectOf(
                PropTypes.string,
            ).isRequired,
            isSavingCourse: PropTypes.bool.isRequired,
            isDeletingCourse: PropTypes.bool.isRequired,
        }).isRequired,
        editingCourseId: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            showForm: PropTypes.func.isRequired,
            hideForm: PropTypes.func.isRequired,
            handleFormFieldChange: PropTypes.func.isRequired,
            saveCourse: PropTypes.func.isRequired,
            deleteCourse: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        topics: undefined,
        courses: undefined,
        auth: null,
    };

    showForm = (courseId = null) => {
        if (this.props.auth && this.props.auth !== null) {
            if (courseId) {
                const course = this.props.courses[courseId];
                this.props.actions.showForm(course, `Edit ${course.title}`, 'Save Changes', courseId);
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
        this.props.actions.saveCourse();
    };

    handleCourseDelete = () => {
        this.props.actions.deleteCourse();
    };

    renderFormSubmitButton = () => {
        const {modal: {saveButtonText, isSavingCourse}} = this.props;
        return isSavingCourse ? (
                <Button
                    className="btn-course-submit loading"
                    type="submit"
                    color="primary"
                    disabled
                >
                    Processing...
                </Button>
            ) : (
                <Button
                    className="btn-course-submit"
                    type="submit"
                    color="primary"
            >
                    {saveButtonText}
                </Button>
            );
    };

    renderFormDeleteButton = () => {
        const {editingCourseId, modal: {isDeletingCourse}} = this.props;
        if (!editingCourseId) {
            return null;
        }
        return isDeletingCourse ? (
                <Button
                    className="btn-course-delete loading"
                    type="button"
                    outline
                    color="danger"
                    disabled
                >
                    Processing...
                </Button>
            ) : (
                <Button
                    className="btn-course-delete"
                    type="button"
                    outline
                    color="danger"
                    onClick={this.handleCourseDelete}
                >
                    Delete Course
                </Button>
            );
    };

    render() {
        const {courses, topics, editing, modal, editingCourseId, actions} = this.props;
        console.log(courses);
        return (
            <div>
                <ul>
                    <ReactCSSTransitionGroup
                        transitionName="block"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={0}
                        transitionAppear
                        transitionAppearTimeout={500}
                    >
                        {
                            isLoaded(courses) && !isEmpty(courses) &&
                            Object.keys(courses).map(courseId => (
                                <Course
                                    key={courseId}
                                    id={courseId}
                                    title={courses[courseId].title}
                                    desc={courses[courseId].description}
                                    img={courses[courseId].img_src}
                                    editing={editingCourseId === courseId}
                                    onCourseClick={() => this.showForm(courseId)}
                                />
                            ))
                        }
                    </ReactCSSTransitionGroup>
                </ul>
                <ModalContainer
                    isOpen={editing}
                    toggle={actions.hideForm}
                    handleFormSubmit={this.handleFormSubmit}
                    title={modal.modalTitle}
                    bodyContent={
                        <CourseForm
                            title={modal.course.title}
                            description={modal.course.description}
                            img_src={modal.course.img_src}
                            topics={topics}
                            topic={modal.course.topic}
                            errors={modal.errors}
                            onChange={this.handleFormFieldChange}
                        />
                    }
                    footerContent={
                        React.createElement(
                            VisibleToUser(
                                () => (
                                    <ButtonGroup>
                                        { this.renderFormDeleteButton() }
                                        { this.renderFormSubmitButton() }
                                    </ButtonGroup>
                                ),
                            ),
                        )
                    }
                />
            </div>
        );
    }

}

export default CoursePage;
