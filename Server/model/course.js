/**
 * Created by Wayuki on 24-Feb-17.
 */
const mongoose = require('mongoose');

const Topic = require('./topic');

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    img_src: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Course = mongoose.model('Course', CourseSchema);

CourseSchema.path('topic').validate((value, respond) => {
    Topic.findOne({_id: value})
        .exec()
        .then((doc) => {
            respond(!!doc);
        })
        .catch(() => {
            respond(false);
        });
}, 'Topic does not exist...');

module.exports = Course;
