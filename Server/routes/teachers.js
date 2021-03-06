/**
 * Created by Wayuki on 24-Feb-17.
 */
const express = require('express');
const router = express.Router();

const Teacher = require('../model/teacher');

router.get('/', (req, res, next) => {
    Teacher.find()
        .exec()
        .then((teachers) => {
            res.json(teachers);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
