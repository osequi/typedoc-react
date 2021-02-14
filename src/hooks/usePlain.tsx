import { TMenuItem } from "../components";
import { useTitle, useLink, TData } from ".";

export function usePlain(data: TData): TMenuItem[] {
  const { children } = data;

  return children?.map((item: TData) => {
    const { children } = item;
    const title = useTitle(item);

    return children
      ? {
          variant: "section",
          title: title,
          children: [usePlain(item)],
        }
      : {
          variant: "item",
          title: title,
          children: useLink(item),
        };
  });
}
