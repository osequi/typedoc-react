import { flattenDeep } from "lodash";
import { useFolders, TData } from ".";

export function usePaths(data: TData): string[] {
  const foldersList = flattenDeep(useFolders(data));
  console.log("foldersList:", foldersList);

  return foldersList.map((item) => {
    const split = item.split("/");
    const fileName = split.pop();
    const fileNameSplit = fileName.split(".");
    return `/${fileNameSplit[0]}`;
  });
}
