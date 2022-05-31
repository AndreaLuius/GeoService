"use strict";

class Header
{
    private url: string;
    private userAgent: string;
    private contentType: string;
    private soapAction: string;

    constructor(url:string,userAgent:string,contentType:string,soapAction:string)
    {
        this.url = url;
        this.userAgent = userAgent;
        this.contentType = contentType;
        this.soapAction = soapAction;
    }

    public getFullInfo()
    {
        return {
            "url": this.url,
            "user-agent":this.userAgent,
            "Content-Type":this.contentType,
            "soapAction": this.soapAction
        };
    }

    public getFullHeader(): object
    {
        return {
            "user-agent":this.userAgent,
            "content-Type":this.contentType,
            "soapAction": this.soapAction
        };
    }

};

export {Header};