const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  Local: {
    localDatabaseUrl: process.env.DB_URI,
    secret: 'password',
  },
};
