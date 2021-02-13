//// NOTE: fs, path imported here works sometimes but they also break
export async function useJson(folder: string, fileName: string, fs, path) {
  const dataDirectory = path.join(process.cwd(), folder);
  const filePath = path.join(dataDirectory, fileName);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}
