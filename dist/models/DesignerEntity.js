"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerEntity = void 0;
class DesignerEntity {
    constructor(code, lastName, name, degree, fsCode, city, address, zipCode, province) {
        this._code = code;
        this._lastName = lastName;
        this._name = name;
        this._degree = degree;
        this._fsCode = fsCode;
        this._city = city;
        this._address = address;
        this._zipCode = zipCode;
        this._province = province;
    }
    set code(newCode) {
        this._code = newCode;
    }
    set lastName(newLastName) {
        this._lastName = newLastName;
    }
    set name(newName) {
        this._name = newName;
    }
    set fsCode(newFsCode) {
        this._fsCode = newFsCode;
    }
    set city(newCity) {
        this._city = newCity;
    }
    set address(newAddress) {
        this._address = newAddress;
    }
    set province(newProvince) {
        this._province = newProvince;
    }
    get code() {
        return this._code;
    }
    get lastName() {
        return this._lastName;
    }
    get name() {
        return this._name;
    }
    get fsCode() {
        return this._fsCode;
    }
    get city() {
        return this._city;
    }
    get address() {
        return this._address;
    }
    get province() {
        return this._province;
    }
}
exports.DesignerEntity = DesignerEntity;
;
