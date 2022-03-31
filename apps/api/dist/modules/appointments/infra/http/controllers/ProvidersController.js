"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ListProvidersService = _interopRequireDefault(require("../../../services/ListProvidersService"));

var _User = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProvidersController {
  async index(req, res) {
    const user_id = req.user.id;

    const listProviders = _tsyringe.container.resolve(_ListProvidersService.default);

    const providers = await listProviders.execute({
      user_id
    });
    return res.json((0, _classTransformer.classToClass)((0, _classTransformer.plainToClass)(_User.default, providers)));
  }

}

exports.default = ProvidersController;