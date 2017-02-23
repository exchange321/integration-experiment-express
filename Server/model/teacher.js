/**
 * Created by Wayuki on 24-Feb-17.
 */
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        required: true,
        trim: true,
    },
    img_src: {
        type: String,
        required: true,
        trim: true,
    },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
