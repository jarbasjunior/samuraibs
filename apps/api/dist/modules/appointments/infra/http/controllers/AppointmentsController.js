"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async craete(req, res) {
    const user_id = req.user.id;
    const {
      provider_id,
      date
    } = req.body;

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      provider_id,
      date,
      user_id
    });
    return res.json(appointment);
  }

}

exports.default = AppointmentsController;