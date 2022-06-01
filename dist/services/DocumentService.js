"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DocumentService = void 0;
const soapRequest = require('easy-soap-request');
const path = require("path");
const fs_1 = __importDefault(require("fs"));
const base_64_1 = __importDefault(require("base-64"));
const extract_zip_1 = __importDefault(require("extract-zip"));
const xml_parser_1 = __importDefault(require("xml-parser"));
const axios_1 = __importDefault(require("axios"));
const stream = __importStar(require("stream"));
const util_1 = require("util");
const ApplicantEntity_js_1 = require("../models/ApplicantEntity.js");
const DesignerEntity_js_1 = require("../models/DesignerEntity.js");
const DocumentEntity_js_1 = require("../models/DocumentEntity.js");
const VisibleDocumentEntity_js_1 = require("../models/VisibleDocumentEntity.js");
const finished = (0, util_1.promisify)(stream.finished);
class DocumentService {
    constructor(header) {
        this.header = header;
    }
    documentInfo(xml) {
        return __awaiter(this, void 0, void 0, function* () {
            const visualData = [];
            try {
                const nonExtractedContent = yield this.getDocument(xml);
                const extractedDocument = [];
                for (let i = 0; i < nonExtractedContent.length; i++)
                    extractedDocument[i] = (0, xml_parser_1.default)(nonExtractedContent[i]);
                let general = this.convertForType(extractedDocument[0]["root"]["children"]);
                let applicant = this.convertForType(extractedDocument[1]["root"]["children"]);
                let designer = this.convertForType(extractedDocument[2]["root"]["children"]);
                for (let item of general.values()) {
                    if (item) {
                        let foundApplicant = applicant.get(item.code);
                        let foundDesigner = designer.get(item.code);
                        let newEntity = new VisibleDocumentEntity_js_1.VisibleDocumentEntity(item.code, item.year, item.docType, item.object, item.coorX, item.coorY, (foundApplicant) ? foundApplicant.name : "Not Found", (foundApplicant) ? foundApplicant.lastName : "Not Found", (foundDesigner) ? foundDesigner.lastName : "Not Found", (foundDesigner) ? foundDesigner.name : "Not Found");
                        visualData.push(newEntity);
                    }
                }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
            return visualData;
        });
    }
    convertForType(extractedDocumentChildrens) {
        let objList;
        let newEntity;
        switch (extractedDocumentChildrens[0]["name"]) {
            case "richiedente":
                objList = new Map();
                for (let item of extractedDocumentChildrens) {
                    newEntity = new ApplicantEntity_js_1.ApplicantEntity(item["children"][0]["content"], item["children"][1]["content"], item["children"][2]["content"], item["children"][3]["content"], item["children"][4]["content"], item["children"][5]["content"], item["children"][6]["content"], item["children"][7]["content"]);
                    objList.set(item["children"][0]["content"], newEntity);
                }
                break;
            case "progettisti":
                objList = new Map();
                for (let item of extractedDocumentChildrens) {
                    newEntity = new DesignerEntity_js_1.DesignerEntity(item["children"][0]["content"], item["children"][1]["content"], item["children"][2]["content"], item["children"][3]["content"], item["children"][4]["content"], item["children"][5]["content"], item["children"][6]["content"], item["children"][7]["content"], item["children"][8]["content"]);
                    objList.set(item["children"][0]["content"], newEntity);
                }
                break;
            case "generale":
                objList = new Map();
                for (let item of extractedDocumentChildrens) {
                    newEntity = new DocumentEntity_js_1.DocumentEntity(item["children"][0]["content"], item["children"][1]["content"], item["children"][2]["content"], item["children"][3]["content"], item["children"][4]["content"], item["children"][5]["content"], item["children"][6]["content"], item["children"][7]["content"], item["children"][8]["content"], item["children"][9]["content"], item["children"][10]["content"], item["children"][11]["content"], item["children"][12]["content"], item["children"][13]["content"], item["children"][14]["content"]);
                    objList.set(item["children"][0]["content"], newEntity);
                }
                break;
            default:
                console.log("The specified document children does not exist");
                throw new Error("The given extracted children dont respect the terms cant continue");
        }
        return objList;
    }
    getDocument(xml) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = this.header.getFullInfo();
            const definedHeader = this.header.getFullHeader();
            let dataArr = [];
            try {
                const res = yield soapRequest({ "url": url, "headers": definedHeader, "xml": xml });
                const content = yield this.extractAndParseFile(res);
                var file = fs_1.default.createWriteStream("./src/downloaded/file.zip");
                yield this.downloadFile(content);
                yield (0, extract_zip_1.default)(path.join(__dirname, "../../", "src", "downloaded", "file.zip"), { dir: path.join(__dirname, "../../", "src", "extracted") });
                fs_1.default.unlinkSync(path.join(__dirname, "../../", "src", "downloaded", "file.zip"));
                const files = fs_1.default.readdirSync(path.join(__dirname, "../../", "src", "extracted"));
                files.forEach(el => {
                    if (path.extname(el) == ".XML")
                        dataArr.push(this.extractInformation(el));
                    fs_1.default.unlinkSync(path.join(__dirname, "../", "../", "src", "extracted", el));
                });
            }
            catch (err) {
                console.log(err);
            }
            return dataArr;
        });
    }
    extractAndParseFile(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let content;
            try {
                const obj = (0, xml_parser_1.default)(res.response.body);
                content = obj.root.children[0].children[0].children[0].content;
                const decoded = base_64_1.default.decode(content);
                content = (0, xml_parser_1.default)(decoded).root.children[1].content;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
            return content;
        });
    }
    downloadFile(fileUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            var file = fs_1.default.createWriteStream("./src/downloaded/file.zip");
            axios_1.default.create();
            yield (0, axios_1.default)({
                method: 'get',
                url: fileUrl,
                responseType: 'stream'
            }).then(response => {
                response.data.pipe(file);
                return finished(file);
            }).catch(err => {
                console.log(err);
                throw new Error('An error has occurred trying to download the file from the given url ' + fileUrl);
            });
        });
    }
    extractInformation(filePath) {
        let data;
        if (fs_1.default.existsSync(path.join(__dirname, "../", "../", "src", "extracted", filePath)))
            data = fs_1.default.readFileSync(path.join(__dirname, "../", "../", "src", "extracted", filePath), 'utf-8');
        else
            throw new Error("The file was not found");
        return data;
    }
}
exports.DocumentService = DocumentService;
;
