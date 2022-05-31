import express from "express";
import PropertiesReader from "properties-reader";

import { DocumentController } from "../controller/DocumentController";
import { DocumentService } from "../services/DocumentService";
import { Header } from "../utilities/Header";

const properties = PropertiesReader("config/soapProperties.properties");
const documentRouter = express();

const soapHeader = 
        new Header(properties.get("server") as string,properties.get("user-agent") as string,
                    properties.get("content-type") as string,properties.get("soap-action") as string);

const documentController = new DocumentController(new DocumentService(soapHeader));

documentRouter.post("/documents",documentController.getDocumentInfo.bind(documentController));

export {documentRouter};