import { parse } from 'js2xmlparser';

export function jsonToXml(json: string): string {
  let parsedJson;
  try {
    parsedJson = JSON.parse(json);
  } catch (error) {
    if (error instanceof Error) return `Invalid JSON: ${error.message}`;
  }
  return parse("root", parsedJson);
}
