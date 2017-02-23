/**
 * Created by Wayuki on 24-Feb-17.
 */
const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
    alias: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
