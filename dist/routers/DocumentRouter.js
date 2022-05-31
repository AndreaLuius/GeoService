"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRouter = void 0;
const express_1 = __importDefault(require("express"));
const properties_reader_1 = __importDefault(require("properties-reader"));
const DocumentController_1 = require("../controller/DocumentController");
const DocumentService_1 = require("../services/DocumentService");
const Header_1 = require("../utilities/Header");
const properties = (0, properties_reader_1.default)("config/soapProperties.properties");
const documentRouter = (0, express_1.default)();
exports.documentRouter = documentRouter;
const soapHeader = new Header_1.Header(properties.get("server"), properties.get("user-agent"), properties.get("content-type"), properties.get("soap-action"));
const documentController = new DocumentController_1.DocumentController(new DocumentService_1.DocumentService(soapHeader));
documentRouter.post("/documents", documentController.getDocumentInfo.bind(documentController));
