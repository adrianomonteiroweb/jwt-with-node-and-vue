const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

const dataBase = require('./config/db.config');

mongoose.Promise = global.Promise;

// connection
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(dataBase.Local.localDatabaseUrl, OPTIONS)
  .then(() => {
    console.log('A base de dados foi conectada');
  }, (err) => {
    console.log(`Erro ao conectar a base de dados...: ${err}`);
    process.exit();
  });

// Rotas
const index = require('./routes/index');

// Todo
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('dev'));

app.use(index);
// Todo

module.exports = app;
