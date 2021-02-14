import { uniq, compact, flattenDeep } from "lodash";
import { TMenuItem } from "../components";
import { useFolders, useTitle, useLink, TData } from ".";

/**
 * Returns a menu following the folder structure.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function useData(data: TData): TMenuItem[] {
  const foldersList = flattenDeep(useFolders(data));
  return parseFolders(foldersList);
}

function parseFolders(folders: string[]): TMenuItem[] {
  return compact(
    folders.reduce((result, item) => {
      return [...result, parseEntry(item, result)];
    }, [])
  );
}

function parseEntry(
  item: string,
  result: TMenuItem[]
): TMenuItem | TMenuItem[] {
  const split = item.split("/");
  if (split.length === 1) {
    return parseItem(item);
  } else {
    return parseSection(item, result);
  }
}

function parseSection(
  item: string,
  result: TMenuItem[]
): TMenuItem | TMenuItem[] {
  const split = item.split("/");
  const title = split[0];
  const newItem = item.replace(`${title}/`, "");

  const newTitle = useTitle({ name: title, kindString: "Module" });
  const existing = result.find((item) => item?.title === newTitle);

  if (existing) {
    existing.children = compact([
      ...existing.children,
      parseEntry(newItem, existing.children),
    ]);
  } else
    return {
      variant: "section",
      title: newTitle,
      children: [parseEntry(newItem, [])],
    };
}

function parseItem(item: string): TMenuItem {
  const split = item.split(".");
  const title = split[0];
  return {
    variant: "item",
    title: useTitle({ name: title, kindString: "Module" }),
    children: useLink({ name: title }),
  };
}
