"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async findAllProviders({
    execept_user_id,
    is_provider
  }) {
    let users;

    if (execept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm.Not)(execept_user_id),
          is_provider: is_provider
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  async create({
    name,
    email,
    password,
    is_provider
  }) {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      is_provider
    });
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;