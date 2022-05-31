const soapRequest = require('easy-soap-request');
const path = require("path");

import fs from "fs";
import decoder from "base-64";
import extract from "extract-zip";
import xmlParser from "xml-parser";
import axios from "axios";
import * as stream from "stream";
import { promisify } from "util";

import { Header } from "../utilities/Header.js"; 
import { ApplicantEntity } from "../models/ApplicantEntity.js";
import { DesignerEntity } from "../models/DesignerEntity.js";
import { DocumentEntity } from "../models/DocumentEntity.js";
import { VisibleDocumentEntity } from "../models/VisibleDocumentEntity.js";

const finished = promisify(stream.finished);

class DocumentService
{
    private header: Header;
    
    constructor(header:Header)
    {
        this.header = header;
    }

    public async documentInfo(xml:String)
    {    
        const visualData: VisibleDocumentEntity[] = [];
        
        try
        {
            const nonExtractedContent: string[] = await this.getDocument(xml);
            const extractedDocument: object[] = [];
        
            for(let i = 0; i < nonExtractedContent.length; i++)
                extractedDocument[i] = xmlParser(nonExtractedContent[i]);
    
            let general = this.convertForType(extractedDocument[0]["root"]["children"]);
            let applicant = this.convertForType(extractedDocument[1]["root"]["children"]);
            let designer = this.convertForType(extractedDocument[2]["root"]["children"]);
    
            for(let item of general.values())
            {
                if(item)
                {
                    let foundApplicant = applicant.get(item.code);
                    let foundDesigner = designer.get(item.code);
        
                    let newEntity = new VisibleDocumentEntity(item.code,item.year,item.docType,item.object,item.coorX,item.coorY,
                                        (foundApplicant) ? foundApplicant.name: "Not Found",(foundApplicant) ? foundApplicant.lastName: "Not Found",
                                        (foundDesigner) ? foundDesigner.lastName: "Not Found",(foundDesigner) ? foundDesigner.name: "Not Found")
                    
                    visualData.push(newEntity);
                }   
            }
        }catch(err)
        {
            console.log(err);
            throw err;
        }    

        return visualData;
    }

    private convertForType(extractedDocumentChildrens: object[])
    {
        let objList;
        let newEntity;
       
        switch(extractedDocumentChildrens[0]["name"])
        {
            case "richiedente":
                objList = new Map<string,ApplicantEntity>();

                for(let item of extractedDocumentChildrens)
                {
                    newEntity = new ApplicantEntity(item["children"][0]["content"],item["children"][1]["content"],
                                    item["children"][2]["content"],item["children"][3]["content"],item["children"][4]["content"],
                                    item["children"][5]["content"],item["children"][6]["content"],item["children"][7]["content"]);

                    objList.set(item["children"][0]["content"],newEntity);
                }
                break;
            case "progettisti":
                objList = new Map<string,DesignerEntity>();

                for(let item of extractedDocumentChildrens)
                {
                    newEntity =  new DesignerEntity(item["children"][0]["content"],item["children"][1]["content"],
                                    item["children"][2]["content"],item["children"][3]["content"],item["children"][4]["content"],
                                    item["children"][5]["content"],item["children"][6]["content"],item["children"][7]["content"],
                                    item["children"][8]["content"]);

                    objList.set(item["children"][0]["content"],newEntity);
                }
                break;
            case "generale":
                objList = new Map<string,DocumentEntity>();

                for(let item of extractedDocumentChildrens)
                {
                    newEntity = new DocumentEntity(item["children"][0]["content"],item["children"][1]["content"],
                                item["children"][2]["content"],item["children"][3]["content"],item["children"][4]["content"],
                                item["children"][5]["content"],item["children"][6]["content"],item["children"][7]["content"],
                                item["children"][8]["content"],item["children"][9]["content"],item["children"][10]["content"],
                                item["children"][11]["content"],item["children"][12]["content"],item["children"][13]["content"],
                                item["children"][14]["content"]);

                    objList.set(item["children"][0]["content"],newEntity);
                }
                break;
            default:
                console.log("The specified document children does not exist");
                throw new Error("The given extracted children dont respect the terms cant continue");
        }
        return objList;
    }

    private async getDocument(xml:String): Promise<string[]>
    {           
        const { url } = this.header.getFullInfo();
        const definedHeader = this.header.getFullHeader();
        let dataArr: string[] = [];
          
        try
        {          
            const res = await soapRequest({"url": url,"headers": definedHeader,"xml": xml});
  
            const  content = await this.extractAndParseFile(res);
                    
            var file = fs.createWriteStream("./src/downloaded/file.zip");

            await this.downloadFile(content);

            await extract(path.join(__dirname,"../../","src","downloaded","file.zip"),{dir: path.join(__dirname,"../../","src" ,"extracted")});
                    
            fs.unlinkSync(path.join(__dirname,"../../","src" ,"downloaded","file.zip"));
            
            const files = fs.readdirSync(path.join(__dirname,"../../","src" ,"extracted"));
            
            files.forEach(el =>
            {
                if(path.extname(el) ==  ".XML")
                    dataArr.push(this.extractInformation(el)); 
                
                fs.unlinkSync(path.join(__dirname,"../","../","src","extracted",el));
            });                        
        }catch(err)
        {
            console.log(err)
        }
        return dataArr;
    }

    private async extractAndParseFile(res)
    {
        let content: string;
        try
        {
            const obj = xmlParser(res.response.body);
            
            content = obj.root.children[0].children[0].children[0].content as string;

            const decoded = decoder.decode(content);

            content = xmlParser(decoded).root.children[1].content as string;
        }catch(err)
        {
            console.log(err);
            throw err;
        }
        
        return content;
    }

    private async downloadFile(fileUrl: string) 
    {
        var file = fs.createWriteStream("./src/downloaded/file.zip");
       
        axios.create();

        await axios(
        {
            method: 'get',
            url: fileUrl,
            responseType: 'stream'
        }).then(response =>
        {
            response.data.pipe(file);
            return finished(file);
        }).catch(err =>
        {
            console.log(err);
            throw new Error('An error has occurred trying to download the file from the given url ' + fileUrl)
        });
    }

    private extractInformation(filePath: string): string
    {
        let data: string;
                
        if(fs.existsSync(path.join(__dirname,"../","../","src","extracted",filePath)))        
            data = fs.readFileSync(path.join(__dirname,"../","../","src","extracted",filePath),'utf-8');
        else
            throw new Error("The file was not found");

        return data;
    }
};

export {DocumentService};