import React, {Component, PropTypes} from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {firebaseConnect, helpers} from 'react-redux-firebase';

import * as teacherActions from '../../actions/teacherAction';

import Teacher from './teacher/Teacher.jsx';
import TeacherForm from './TeacherForm.jsx';
import ModalContainer from '../common/ModalContainer.jsx';

import {VisibleToUser} from '../../auth/auth';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebaseConnect([
    'teachers',
])
@connect(
    ({firebase, teacherPage}) => ({
        teachers: dataToJS(firebase, 'teachers'),
        auth: pathToJS(firebase, 'auth'),
        ...teacherPage,
    }),
    dispatch => ({
        actions: bindActionCreators(teacherActions, dispatch),
    }),
)
class TeachersPage extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            uid: PropTypes.string.isRequired,
        }),
        teachers: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            img_src: PropTypes.string.isRequired,
        }).isRequired),
        editing: PropTypes.bool.isRequired,
        modal: PropTypes.shape({
            modalTitle: PropTypes.string.isRequired,
            saveButtonText: PropTypes.string.isRequired,
            teacher: PropTypes.shape({
                name: PropTypes.string.isRequired,
                bio: PropTypes.string.isRequired,
                img_src: PropTypes.string.isRequired,
            }).isRequired,
            errors: PropTypes.objectOf(
                PropTypes.string.isRequired,
            ).isRequired,
        }).isRequired,
        editingTeacherId: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            showForm: PropTypes.func.isRequired,
            hideForm: PropTypes.func.isRequired,
            handleFormFieldChange: PropTypes.func.isRequired,
            saveTeacher: PropTypes.func.isRequired,
            deleteTeacher: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        teachers: undefined,
        auth: null,
    };

    showForm = (teacherId = null) => {
        if (this.props.auth && this.props.auth !== null) {
            if (teacherId) {
                const teacher = this.props.teachers[teacherId];
                this.props.actions.showForm(teacher, `Edit ${teacher.name}`, 'Save Changes', teacherId);
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
        this.props.actions.saveTeacher();
    };

    handleTeacherDelete = () => {
        this.props.actions.deleteTeacher();
    };

    renderFormSubmitButton = () => {
        const {modal: {saveButtonText, isSavingTeacher}} = this.props;
        return isSavingTeacher ? (
                <Button
                    className="btn-teacher-submit loading"
                    type="submit"
                    color="primary"
                    disabled
                >
                    Processing...
                </Button>
            ) : (
                <Button
                    className="btn-teacher-submit"
                    type="submit"
                    color="primary"
            >
                    {saveButtonText}
                </Button>
            );
    };

    renderFormDeleteButton = () => {
        const {editingTeacherId, modal: {isDeletingTeacher}} = this.props;
        if (!editingTeacherId) {
            return null;
        }
        return isDeletingTeacher ? (
                <Button
                    className="btn-teacher-delete loading"
                    type="button"
                    outline
                    color="danger"
                    disabled
                >
                    Processing...
                </Button>
            ) : (
                <Button
                    className="btn-teacher-delete"
                    type="button"
                    outline
                    color="danger"
                    onClick={this.handleTeacherDelete}
                >
                    Delete Teacher
                </Button>
            );
    };

    render() {
        const {editing, teachers, editingTeacherId, modal, actions: {hideForm}} = this.props;
        return (
            <div className="main-content">
                <h2>Teachers</h2>
                <ul className="clearfix">
                    <ReactCSSTransitionGroup
                        transitionName="block"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        transitionAppear
                        transitionAppearTimeout={500}
                    >
                        {
                            isLoaded(teachers) && !isEmpty(teachers) &&
                            Object.keys(teachers).map((teacherId) => {
                                const teacher = teachers[teacherId];
                                return (
                                    <Teacher
                                        key={teacherId}
                                        id={teacherId}
                                        name={teacher.name}
                                        bio={teacher.bio}
                                        img={teacher.img_src}
                                        editing={teacherId === editingTeacherId}
                                        handleTeacherClick={() => this.showForm(teacherId)}
                                    />
                                );
                            })
                        }
                    </ReactCSSTransitionGroup>
                </ul>
                { React.createElement(VisibleToUser(() => (
                    <div className="btn-container text-right">
                        <Button outline color="primary" onClick={() => this.showForm()}>Add Teacher</Button>
                    </div>
                ))) }
                <ModalContainer
                    isOpen={editing}
                    toggle={hideForm}
                    handleFormSubmit={this.handleFormSubmit}
                    title={modal.modalTitle}
                    bodyContent={(
                        <TeacherForm
                            name={modal.teacher.name}
                            bio={modal.teacher.bio}
                            img={modal.teacher.img_src}
                            onChange={this.handleFormFieldChange}
                            errors={modal.errors}
                        />
                    )}
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

export default TeachersPage;
