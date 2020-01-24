const logger = require('@lib/logger');
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.winston.info('Mongo connection established');
}).catch(() => {
  throw new Error('Unable to connect to database');
});

mongoose.set('debug', (collectionName, method, query, doc) => {
  logger.winston.debug(`${collectionName}.${method}`, query, doc);
});

module.exports = mongoose;
