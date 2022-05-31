"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DocumentRouter_js_1 = require("./routers/DocumentRouter.js");
const body_parser_1 = __importDefault(require("body-parser"));
function run() {
    const app = express();
    app.use(express.json());
    app.use(body_parser_1.default.text({ type: 'text/xml' }));
    app.use(DocumentRouter_js_1.documentRouter);
    app.listen(8080, () => console.log("listening on port 8080"));
}
run();
// const cont = new
//     DocumentController(new Header("https://suedi.it/WSPRATICHE/WSPRATICHE.asmx",
// 'sampleTest','text/xml;charset=UTF-8','http://www.progamma.com/Geosuedi'));
// const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
// xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
// xmlns:prog="http://www.progamma.com">
//             <soapenv:Header/>
//             <soapenv:Body>
//                 <prog:Geosuedi soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
//                     <pCodCatastale xsi:type="xsd:string">H328</pCodCatastale>
//                 </prog:Geosuedi>
//             </soapenv:Body>
//         </soapenv:Envelope>`;
// cont.documentInfo(xml);
