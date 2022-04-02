"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

require("dotenv/config");

let ListWorkDaysService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ListWorkDaysService {
  async execute() {
    if (process.env.ALL_DAYS === "1") {
      return {
        days_on: [0, 1, 2, 3, 4, 5, 6],
        days_off: []
      };
    }

    return {
      days_on: [1, 2, 3, 4, 5],
      days_off: [0, 6]
    };
  }

}) || _class);
var _default = ListWorkDaysService;
exports.default = _default;