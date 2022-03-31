"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateAppointmentService {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    date,
    provider_id,
    user_id
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default("You cant't create an appointment on past date");
    }

    if (user_id === provider_id) {
      throw new _AppError.default("You can't create an appointment with yourself");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppError.default('You can only create appointments between 8am and 5pm');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate({
      date: appointmentDate,
      provider_id
    });

    if (findAppointmentInSameDate) {
      throw new _AppError.default('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate
    });
    return appointment;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;