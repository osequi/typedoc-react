import { promises as fs } from "fs";
import path from "path";

export async function useJson(folder: string, fileName: string) {
  const dataDirectory = path.join(process.cwd(), folder);
  const filePath = path.join(dataDirectory, fileName);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}
