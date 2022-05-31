"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentEntity = void 0;
class DocumentEntity {
    constructor(code, document, year, guid, bis, variant, docType, protocol, object, state, issued, location, zipCode, corX, corY) {
        this._code = code;
        this._guid = guid;
        this._bis = bis;
        this._variant = variant;
        this._docType = docType;
        this._document = document;
        this._year = year;
        this._protocol = protocol;
        this._object = object;
        this._state = state;
        this._issued = issued;
        this._location = location;
        this._zipCode = zipCode;
        this._corX = corX;
        this._corY = corY;
    }
    set code(newCode) {
        this._code = newCode;
    }
    set year(newYear) {
        this._year = newYear;
    }
    set docType(newDocType) {
        this._docType = newDocType;
    }
    set object(newObject) {
        this._object = newObject;
    }
    set coorX(newX) {
        this._corX = newX;
    }
    set coorY(newY) {
        this._corY = newY;
    }
    get code() {
        return this._code;
    }
    get year() {
        return this._year;
    }
    get docType() {
        return this._docType;
    }
    get object() {
        return this._object;
    }
    get coorX() {
        return this._corX;
    }
    get coorY() {
        return this._corY;
    }
}
exports.DocumentEntity = DocumentEntity;
;
