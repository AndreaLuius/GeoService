"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const properties_reader_1 = __importDefault(require("properties-reader"));
const inspect = require("util").inspect;
class DocumentController {
    constructor(documentService) {
        this._documentService = documentService;
        this._property = (0, properties_reader_1.default)("config/database.properties");
    }
    getDocumentInfo(req, res) {
        const xml = req.body;
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const documentInfoList = yield this._documentService.documentInfo(xml);
                documentInfoList.forEach(item => {
                    console.log(item);
                    // db.query(this._property.get("insert-document"),[item.])
                });
                res.status(201).send(documentInfoList);
            }
            catch (err) {
                console.log(err);
                res.status(501).send("An error as occurred " + err);
            }
        }))();
    }
}
exports.DocumentController = DocumentController;
;
