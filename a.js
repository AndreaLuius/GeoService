const soapRequest = require('easy-soap-request');
const fs = require('fs');

const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://www.progamma.com/Geosuedi',
};

const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prog="http://www.progamma.com">
                <soapenv:Header/>
                <soapenv:Body>
                    <prog:Geosuedi soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <pCodCatastale xsi:type="xsd:string">ciduce</pCodCatastale>
                    </prog:Geosuedi>
                </soapenv:Body>
            </soapenv:Envelope>`;

// usage of module
(async () => {
    try
    {
        const { response } = await soapRequest({ url: "https://suedi.it/WSPRATICHE/WSPRATICHE.asmx", headers: sampleHeaders, xml: xml}); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        console.log(headers);
        console.log(body);
        console.log(statusCode);
    }catch(err)
    {
        console.log("eroor")
        console.log(err);
    }
})();