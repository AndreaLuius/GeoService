import express from "express";
import { Request, Response } from "express";
import PropertiesReader from "properties-reader";

import { db } from "../connectors/DatabaseHandler.js";
import { VisibleDocumentEntity } from "../models/VisibleDocumentEntity.js";
import { DocumentService } from "../services/DocumentService.js";

const inspect = require("util").inspect;

class DocumentController
{
    private _documentService: DocumentService;
    private _property;

    constructor(documentService: DocumentService)
    {
        this._documentService = documentService;
        this._property = PropertiesReader("config/database.properties");
    }

    public getDocumentInfo(req: Request,res: Response)
    {        
        const xml: string = req.body;

        (async () =>
        {
            try
            {
                const documentInfoList = await this._documentService.documentInfo(xml);
                documentInfoList.forEach((item: VisibleDocumentEntity) =>
                {                    
                    db.query(this._property.get("insert-document"),[item.code,item.year,item.docType,item.object,
                                                    item.x,item.y,item.applicantName,item.applicantLast,
                                                    item.designerName,item.designerLast],
                    (err,result): void =>
                    {
                        if(err)
                        {
                            console.log(err);
                            res.status(501).send("An error as occurred " + err); 
                            return;               
                        }
                    });
                });
                res.status(201).send(documentInfoList);
            }catch(err)
            {
                console.log(err);
                res.status(501).send("An error as occurred " + err);                
            }
        })();
    }
};

export {DocumentController};