export function jsonToTs(json: string): string {
  let parsedJson;
  try {
    parsedJson = JSON.parse(json);
  } catch (error) {
    if (error instanceof Error) return `Invalid JSON: ${error.message}`;
  }

  const getType = (value: any): string => {
    if (Array.isArray(value)) {
      return `${getType(value[0])}[]`;
    } else if (typeof value === 'object' && value !== null) {
      return getInterface(value);
    } else {
      return typeof value;
    }
  };

  const getInterface = (obj: any, indent: string = ''): string => {
    const newIndent = `${indent}  `;
    return `{\n${Object.keys(obj)
      .map(key => `${newIndent}${key}: ${getType(obj[key])};`)
      .join('\n')}\n${indent}}`;
  };

  const interfaceName = "GeneratedInterface";
  const tsInterface = `interface ${interfaceName} ${getInterface(parsedJson)}`;

  return tsInterface;
}