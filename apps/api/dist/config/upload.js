"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tmpFolder = (0, _path.resolve)(__dirname, '..', '..', 'tmp');
var _default = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: (0, _path.resolve)(tmpFolder, 'uploads'),
  multer: {
    storage: _multer.default.diskStorage({
      destination: tmpFolder,

      filename(req, file, callback) {
        const fileHash = _crypto.default.randomBytes(10).toString('HEX');

        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }

    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'eliasgcf-app-samurai'
    }
  }
};
exports.default = _default;