"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeHashProvider {
  async generateHash(payload) {
    return payload;
  }

  async comapreHash(payload, hashed) {
    return payload === hashed;
  }

}

exports.default = FakeHashProvider;