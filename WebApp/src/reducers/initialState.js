/**
 * Created by Wayuki on 03-Feb-17 0003.
 */
export default {
    teacherPage: {
        editing: false,
        modal: {
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
    },
    appPage: {
        notification: {
            hasNotification: false,
            type: '',
            msg: '',
        },
        redirect: {
            hasRedirect: false,
            uri: '',
        },
    },
    coursesPage: {
        editing: false,
        modal: {
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
    },
    coursePage: {
        editing: false,
        modal: {
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
    },
    loginPage: {
        credential: {
            email: '',
            password: '',
        },
        isLoggingIn: false,
    },
};
