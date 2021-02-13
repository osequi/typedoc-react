import { TMenuItem } from "../components";
import { useData, useList } from ".";

export function useMenu(data) {
  const parsed = useData(data);
  console.log("parsed:", parsed);
  const simpleList = useList(parsed);
  return <ul>{simpleList}</ul>;
}
