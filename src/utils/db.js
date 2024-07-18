"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_snake_case_1 = __importDefault(require("to-snake-case"));
const knexfile_1 = require("../knexfile");
const knex_1 = __importDefault(require("knex"));
const camelize_1 = __importDefault(require("camelize"));
const knexConfig = Object.assign(Object.assign({}, knexfile_1.baseKnexConfig), { wrapIdentifier: (value, originalIml) => {
        if (value === "*") {
            return originalIml(value);
        }
        return originalIml((0, to_snake_case_1.default)(value));
    }, postProcessResponse: (result) => {
        return (0, camelize_1.default)(result);
    } });
exports.default = (0, knex_1.default)(knexConfig);
