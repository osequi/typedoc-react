import { TMenu, defaultMenu } from "../components";
import { useData, useFolders, useList } from ".";

export function useMenu(props: TMenu = defaultMenu) {
  const { data, variant } = props;
  console.log("variant:", variant);

  let parsed = [];
  switch (variant) {
    case "plain":
      parsed = useData(data);
      break;
    case "folders":
      parsed = useFolders(data);
  }

  const simpleList = useList(parsed);
  return <ul>{simpleList}</ul>;
}
