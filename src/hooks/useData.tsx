import { TMenuItem } from "../components";
import { useTitle, useLink } from ".";

export function useData(data): TMenuItem[] {
  const { children } = data;

  return children?.map((item) => {
    const { name, children } = item;
    const title = useTitle(item);

    return children
      ? {
          variant: "section",
          title: title,
          children: [useData(item)],
        }
      : {
          variant: "item",
          title: title,
          children: useLink(item),
        };
  });
}
