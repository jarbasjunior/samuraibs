"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let createAppointment;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 10, 13)
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);
    await createAppointment.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: appointmentDate
    });
    await expect(createAppointment.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: appointmentDate
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 10, 11)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 10, 13)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment befor 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 11, 7)
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 11, 18)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});