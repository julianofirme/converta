import yaml from 'js-yaml';

export function yamlToJson(yamlString: string): string {
  try {
    const jsonObj = yaml.load(yamlString);
    return JSON.stringify(jsonObj, null, 2);
  } catch (error) {
    if (error instanceof Error) return `Invalid YAML: ${error.message}`;
  }
  return '';
}
