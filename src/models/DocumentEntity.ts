"use strict"

class DocumentEntity
{
    private _code: string;
    private _guid: String;
    private _document: Number;
    private _year: String;
    private _bis: String;
    private _variant: String;
    private _docType: String;
    private _protocol: Number;
    private _object: String;
    private _state: String;
    private _issued: String;
    private _location: String;
    private _zipCode: String;
    private _corX: string;
    private _corY: string;

    constructor(code:string,document:Number, year:String,guid:String,bis:String,variant:String,docType:String,protocol:Number,
        object:String,state:String,issued:String,location:String,zipCode:String,corX:string,corY:string)
    {
        this._code = code;
        this._guid = guid;
        this._bis = bis;
        this._variant = variant;
        this._docType = docType;
        this._document = document;
        this._year = year;
        this._protocol = protocol;
        this._object = object;
        this._state = state;
        this._issued = issued;
        this._location = location;
        this._zipCode = zipCode;
        this._corX = corX;
        this._corY = corY;
    }

    public set code(newCode: string)
    {
        this._code = newCode;
    }

    public set year(newYear: String)
    {
        this._year = newYear;
    }
    
    public set docType(newDocType: String)
    {
        this._docType = newDocType;
    }
    
    public set object(newObject: String)
    {
        this._object = newObject;
    }

    public set coorX(newX: string)
    {
        this._corX = newX;
    }

    public set coorY(newY: string)
    {
        this._corY = newY;
    }
    
    public get code(): string
    {
        return this._code;
    }

    public get year()
    {
        return this._year;
    }

    public get docType()
    {
        return this._docType;
    }

    public get object()
    {
        return this._object;
    }

    public get coorX()
    {
        return this._corX;
    }

    public get coorY()
    {
        return this._corY;
    }


};

export{DocumentEntity};