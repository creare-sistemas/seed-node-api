const env = require('./env');
const http = require('./http');
const logger = require('./logger');

setImmediate(() => {
  http.listen(env.PORT, () => {
    logger.info(__('http.started', env.PORT, env.I18N_LOCALE));
  });
});
