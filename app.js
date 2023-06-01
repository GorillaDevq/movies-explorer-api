require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const globalHandleError = require('./errors/globalHandleError');
const NotFound = require('./middlewares/notFound');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(limiter);
app.use(cors);

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use('*', NotFound);

app.use(errorLogger);
app.use(errors());

app.use(globalHandleError);

app.listen(PORT);
