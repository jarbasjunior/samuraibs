"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

require("express-async-errors");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import rateLimiter from '@shared/infra/http/middlewares/RateLimiter';
const app = (0, _express.default)();
app.use((0, _cors.default)({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: '*'
}));
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder)); // app.use(rateLimiter);

app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, req, res, _) => {
  if (err instanceof _AppError.default) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  } // eslint-disable-next-line


  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
const port = process.env.PORT || 3333;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`⚡️ Server started on port ${port}!`);
});