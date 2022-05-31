
class DesignerEntity
{
    private _code: string;
    private _lastName: string;
    private _name: string;
    private _degree: string;
    private _fsCode: string;
    private _city: string;
    private _address: string;
    private _zipCode: string;
    private _province: string;
    
    constructor(code: string, lastName: string,name: string, degree: string, fsCode: string,
            city: string, address: string, zipCode: string, province: string)
    {
        this._code = code;
        this._lastName = lastName;
        this._name = name;
        this._degree = degree;
        this._fsCode = fsCode;
        this._city = city;
        this._address = address;
        this._zipCode = zipCode;
        this._province = province;
    }

    public set code(newCode: string)
    {
        this._code = newCode;
    }

    public set lastName(newLastName: string)
    {
        this._lastName = newLastName;
    }

    public set name(newName: string)
    {
        this._name = newName;
    }

    public set fsCode(newFsCode: string)
    {
        this._fsCode = newFsCode;
    }

    public set city(newCity: string)
    {
        this._city = newCity;
    }

    public set address(newAddress: string)
    {
        this._address = newAddress;
    }

    public set province(newProvince: string)
    {
        this._province = newProvince;
    }

    public get code()
    {
        return this._code;
    }

    public get lastName()
    {
        return this._lastName;
    }

    public get name()
    {
        return this._name;
    }

    public get fsCode()
    {
        return this._fsCode;
    }

    public get city()
    {
        return this._city;
    }

    public get address()
    {
        return this._address;
    }

    public get province()
    {
        return this._province;
    }

};

export{DesignerEntity};