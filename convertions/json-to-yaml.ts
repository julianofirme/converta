import yaml from 'js-yaml';

export function jsonToYaml(json: string): string {
  let parsedJson;
  try {
    parsedJson = JSON.parse(json);
  } catch (error) {
    if (error instanceof Error) return `Invalid JSON: ${error.message}`;
  }
  return yaml.dump(parsedJson);
}
