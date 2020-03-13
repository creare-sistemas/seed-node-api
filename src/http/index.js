const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('../i18n');
const multer = require('multer');
const env = require('../env');
const { NotFoundError, InvalidFileFormatException } = require('../errors');

/* Routes */
const helloRoute = require('./routes/helloRoute');

/* Middlewares */
const errorHandler = require('./middlewares/errorHandler');

/* Express initialization */
const app = express();

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(
  bodyParser.json({
    limit: env.BODY_LIMIT,
  })
);

/* Lang config i18n */
app.use(i18n.init);
i18n.setLocale(env.I18N_LOCALE);

/* Multer upload files configuration */
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      return cb(null, true);
    }
    return cb(
      new InvalidFileFormatException(null, req.__('error.only.valid.formats')),
      false
    );
  },
});
app.use(upload.single('file'));

/* Instatiate routes */
app.use('/hello', helloRoute);
app.use(errorHandler);

// eslint-disable-next-line no-unused-vars
app.all('*', (req, res, next) => {
  res
    .status(404)
    .send(new NotFoundError('Invalid Path.'))
    .end();
});

module.exports = app;
