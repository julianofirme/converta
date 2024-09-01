import xml2js from 'xml2js';

export function xmlToJson(xml: string): string {
  let jsonResult;
  xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
    if (err) {
      jsonResult = `Invalid XML: ${err.message}`;
    } else {
      jsonResult = JSON.stringify(result, null, 2);
    }
  });

  return jsonResult as unknown as string;
}
