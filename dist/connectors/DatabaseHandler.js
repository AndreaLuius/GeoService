"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const properties_reader_1 = __importDefault(require("properties-reader"));
const properties = (0, properties_reader_1.default)("config/database.properties");
const db = new pg_1.Pool({
    user: properties.get("db-user"),
    password: properties.get("db-pwd"),
    host: properties.get("db-host"),
    port: properties.get("db-port"),
});
exports.db = db;
