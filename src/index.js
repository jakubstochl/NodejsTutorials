require('module-alias/register');
const app = require('./app');
const logger = require('@lib/logger');
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.winston.info('Server running on port ' + port);
});