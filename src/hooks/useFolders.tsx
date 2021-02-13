import { uniq, compact, flattenDeep } from "lodash";
import { TData, TMenuItem } from "../components";

export function useFolders(data: TData): TMenuItem[] {
  const structure = uniq(compact(flattenDeep(getFolders(data, []))));
  console.log("structure:", structure);
  return [];
}

function getFolders(data: TData, result: string[]): string[] {
  const { sources, children } = data;
  const fileName = sources ? sources[0]?.fileName : null;

  return children?.reduce((newResult, item) => {
    return [...result, ...newResult, fileName, getFolders(item, result)];
  }, []);
}
