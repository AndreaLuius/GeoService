
class VisibleDocumentEntity
{
    private code: string;
    private year: Number;
    private docType: string;
    private object: String;
    private x: string;
    private y: string;
    private applicantName: string;
    private applicantLast: string;
    private designerName: string;
    private designerLast: string;

    constructor(code: string, year: Number, docType: string, object: String,x: string,y: string,
        applicantName: string, applicantLast: string, designerName: string, designerLast: string)
    {
        this.code = code;
        this.year = year;
        this.docType = docType;
        this.object = object;
        this.x = x;
        this.y = y;
        this.applicantName = applicantName;
        this.applicantLast = applicantLast;
        this.designerName = designerName;
        this.designerLast = designerLast;
    }
};

export{VisibleDocumentEntity};