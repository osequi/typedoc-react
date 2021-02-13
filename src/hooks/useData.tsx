import { TData, TMenuItem } from "../components";
import { useTitle, useLink } from ".";

export function useData(data: TData): TMenuItem[] {
  const { children } = data;

  return children?.map((item) => {
    const { children } = item;
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
