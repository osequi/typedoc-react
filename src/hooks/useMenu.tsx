import { TMenu, defaultMenu } from "../components";
import { usePlain, useFolders, useList } from ".";

export function useMenu(props: TMenu = defaultMenu) {
  const { data, variant } = props;

  let parsed = [];
  switch (variant) {
    case "plain":
      parsed = usePlain(data);
      break;
    case "folders":
      parsed = useFolders(data);
      break;
  }

  const simpleList = useList(parsed);
  return <ul>{simpleList}</ul>;
}
