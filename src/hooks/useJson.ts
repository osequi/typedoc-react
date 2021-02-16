//// NOTE: fs, path when imported here sometimes breaks

//// NOTE: This is a partial mapping of the data, good enough to create a menu structure. For a more thorough mapping see `usePage`
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
