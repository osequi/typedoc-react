import { TMenu, defaultMenu } from "../components";
import { useData, useFolders, useList } from ".";

export function useMenu(props: TMenu = defaultMenu) {
  const { data, variant } = props;

  let parsed = [];
  switch (variant) {
    case "plain":
      parsed = useData(data);
    case "folders":
      parsed = useFolders(data);
  }

  const simpleList = useList(parsed);
  return <ul>{simpleList}</ul>;
}
