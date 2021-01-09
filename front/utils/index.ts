/**
 * get filename extension
 * @param filename input file name
 */
export function getExtension(filename: string) {
  const index = filename.lastIndexOf('.');
  if (index === -1) return '';
  return filename.slice(index + 1).toLowerCase();
}
