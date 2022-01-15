const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

// Rotas
const index = require('./routes/index');

// Todo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(cors());
app.use(morgan('dev'));

app.use(index);
// Todo

module.exports = app;
