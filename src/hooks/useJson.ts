//// NOTE: fs, path imported here sometimes break

export interface TData {
  name: string;
  kindString?: string;
  children?: any;
  sources?: { fileName: string }[];
}

//// NOTE: async function doesn't accept TData as return type
export async function useJson(folder: string, fileName: string, fs, path) {
  const dataDirectory = path.join(process.cwd(), folder);
  const filePath = path.join(dataDirectory, fileName);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}
