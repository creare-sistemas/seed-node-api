const KnexHelper = require('./KnexHelper');
const HelloHelper = require('./helloHelper');

module.exports = {
  knexHelper: new KnexHelper(),
  helloHelper: new HelloHelper(),
};
