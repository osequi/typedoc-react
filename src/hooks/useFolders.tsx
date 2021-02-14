import { uniq, compact, flattenDeep } from "lodash";
import { TMenuItem } from "../components";
import { useTitle, useLink, useFilename, TData } from ".";

export function useFolders(data: TData): TMenuItem[] {
  const foldersList = uniq(compact(flattenDeep(getFolders(data, []))));
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
  const existing = result.find((item) => item?.title === title);
  if (existing) {
    existing.children = compact([
      ...existing.children,
      parseEntry(newItem, existing.children),
    ]);
  } else
    return {
      variant: "section",
      title: title,
      children: [parseEntry(newItem, [])],
    };
}

function parseItem(item: string): TMenuItem {
  const split = item.split(".");
  const title = split[0];
  return {
    variant: "item",
    title: title,
    children: "link",
  };
}

function getFolders(data: TData, result: string[]): string[] {
  const { sources, children } = data;
  const fileName = sources ? useFilename(sources[0]?.fileName) : null;

  return children?.reduce((newResult, item) => {
    return [...result, ...newResult, fileName, getFolders(item, result)];
  }, []);
}
