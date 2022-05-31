import express from "express";
import { Request, Response } from "express";

import { DocumentService } from "../services/DocumentService.js";

const inspect = require("util").inspect;

class DocumentController
{
    private _documentService: DocumentService;

    constructor(documentService: DocumentService)
    {
        this._documentService = documentService;
    }

    public getDocumentInfo(req: Request,res: Response)
    {        
        const xml: string = req.body;

        (async () =>
        {
            try
            {
                const test = await this._documentService.documentInfo(xml);
                res.status(201).send(test);
            }catch(err)
            {
                console.log(err);
                res.status(501).send("An error as occurred " + err);                
            }

        })();
    }
};

export {DocumentController};