/**
 * Sanitizes filenames.
 *
 * - Return null for `index.ts`
 * - Removes the `/src` prefix
 *
 * @param  fileName The file name to be sanitized
 * @return          The sanitized file name, or null
 */
export function useFilename(fileName: string): string | null {
  return fileName.includes("index.ts") ? null : fileName.replace("src/", "");
}
