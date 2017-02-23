/**
 * Created by Wayuki on 24-Feb-17.
 */
const express = require('express');
const router = express.Router();

const Topic = require('../model/topic');

router.get('/', (req, res, next) => {
    Topic.find()
        .exec()
        .then((topics) => {
            res.json(topics);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
