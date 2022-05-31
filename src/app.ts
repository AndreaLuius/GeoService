import express = require('express');
import { documentRouter } from "./routers/DocumentRouter.js";
import { Header } from "./utilities/Header";
import bodyParser from 'body-parser';

function run(): void
{
    const app = express();

    app.use(express.json());
    app.use(bodyParser.text({ type: 'text/xml' }))
    app.use(documentRouter);

    app.listen(8080,() => console.log("listening on port 8080"));
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