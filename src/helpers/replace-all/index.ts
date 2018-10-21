export default (value: string, search: string, replacement: string): string => {
  const regex: RegExp = new RegExp(`/${search}/g`);
  return value.replace(regex, replacement);
}