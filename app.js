const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');

const swaggerDocument = require('./swagger.json');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const authenticate = require('./middlewares/authenticate');

const app = express();

require('./passport/local');

require('./validationSchemas/validation.module');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticate(), usersRouter);
app.use('*', indexRouter);

module.exports = app;
