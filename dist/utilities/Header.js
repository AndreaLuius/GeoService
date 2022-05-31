"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
class Header {
    constructor(url, userAgent, contentType, soapAction) {
        this.url = url;
        this.userAgent = userAgent;
        this.contentType = contentType;
        this.soapAction = soapAction;
    }
    getFullInfo() {
        return {
            "url": this.url,
            "user-agent": this.userAgent,
            "Content-Type": this.contentType,
            "soapAction": this.soapAction
        };
    }
    getFullHeader() {
        return {
            "user-agent": this.userAgent,
            "content-Type": this.contentType,
            "soapAction": this.soapAction
        };
    }
}
exports.Header = Header;
;
