const mongoose = require('mongoose');

// Importa o arquivo: 'db.config.js'
const database = require('./db.config'); // conexão local: MongoDB

mongoose.Promise = global.Promise;

// Conexão Base de Dados:
mongoose.connect(database.local.localUrlDatabse, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('A Base de Dados foi conectada com sucesso!');
}, (err) => {
  console.log(`Erro ao conectar com a Base de Dados...: ${err}`);
  process.exit();
});
