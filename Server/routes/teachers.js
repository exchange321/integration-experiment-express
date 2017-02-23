/**
 * Created by Wayuki on 24-Feb-17.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({text: 'Server Online'});
});

module.exports = router;
