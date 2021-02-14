import { TMenu, defaultMenu } from "../components";
import { useData, useList } from ".";

export function useMenu(props: TMenu = defaultMenu) {
  const { data } = props;
  const parsed = useData(data);
  const simpleList = useList(parsed);
  return <ul>{simpleList}</ul>;
}
