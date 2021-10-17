const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const dbURL = process.env.DB_URL;

const middlewares = require('./middlewares');
const userRouter = require('./routes/user.route');

const app = express();

mongoose.connect(dbURL, {
  useNewUrlParser: true
})
  // eslint-disable-next-line no-console
  .then(() => console.info(`Connected to MongoDB at ${dbURL}`))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB...', err);
    process.exit(3);
  });

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
