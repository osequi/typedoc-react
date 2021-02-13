import { TMenuItem } from "../components";
import { useTitle } from ".";

export function useData(data) {
  const { children } = data;
  let level = 0;

  return children.map((item) => {
    const { name } = item;
    return {
      variant: "section",
      title: useTitle(name),
      children: [],
    };
  });
}
