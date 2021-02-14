import { uniq, compact } from "lodash";
import { TData } from ".";

export function useFolders(data: TData): string[] {
  const { children } = data;

  return uniq(
    compact(
      children.map((item) => {
        if (!item?.sources) return null;
        const { sources } = item;
        const { fileName } = sources[0];
        const strippedFileName = fileName.replace("src/", "");
        return strippedFileName.includes("index.ts")
          ? useFolders(item)
          : strippedFileName;
      })
    )
  ) as string[];
}
