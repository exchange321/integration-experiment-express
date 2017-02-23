/**
 * Created by Wayuki on 24-Feb-17.
 */
const express = require('express');
const logger = require('morgan');

const teacherRoutes = require('./routes/teachers');

const app = express();

app.use(logger('dev'));

app.use('/teachers', teacherRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    /* eslint-disable no-console */
    console.dir('Express server is starting...');
});
