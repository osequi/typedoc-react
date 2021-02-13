export function useFilename(fileName: string): string {
  return fileName.includes("index.ts") ? null : fileName.replace("src/", "");
}
