/**
 * Created by Wayuki on 24-Feb-17.
 */
const express = require('express');
const router = express.Router();

const Course = require('../model/course');

router.get('/', (req, res, next) => {
    Course.find()
        .exec()
        .then((courses) => {
            res.json(courses);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
