/**
 * Created by Wayuki on 24-Feb-17.
 */
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const teacherRoute = require('./routes/teachers');
const topicRoute = require('./routes/topics');
const courseRoute = require('./routes/courses');

mongoose.Promise = require('bluebird');
const app = express();

// mongodb connection
mongoose.connect('mongodb://localhost:27017/ie-express');
const db = mongoose.connection;

app.use(logger('dev'));
app.use(session({
    secret: '361W1F4XOIdSkAy2o0I7G2Ld7I9vo5PR',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db,
    }),
}));

db.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
});

db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected!');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/teachers', teacherRoute);
app.use('/topics', topicRoute);
app.use('/courses', courseRoute);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler
// eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-console
    console.dir('Express server is starting...');
});
