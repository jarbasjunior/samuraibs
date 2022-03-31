"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(req, res) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserAvatarController;