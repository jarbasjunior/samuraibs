"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderAppointmentsService = _interopRequireDefault(require("../../../services/ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(req, res) {
    const provider_id = req.user.id;
    const {
      day,
      month,
      year
    } = req.query;

    const listProviderAppointments = _tsyringe.container.resolve(_ListProviderAppointmentsService.default);

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return res.json(appointments);
  }

}

exports.default = ProviderAppointmentsController;