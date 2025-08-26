export function getProperty(propertyName: string | undefined): string {
  if (!propertyName) {
    throw new Error("getProperty(): Environment variable name is not provided.");
  }

  return process.env[propertyName] as string;
}
