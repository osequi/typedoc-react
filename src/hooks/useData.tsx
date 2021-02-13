import Link from "next/link";
import { TMenuItem } from "../components";
import { useTitle } from ".";

export function useData(data): TMenuItem[] {
  if (!data) return null;
  const { children } = data;

  //console.log("useData children:", children);

  return children?.map((item) => {
    if (!item) return null;
    const { name, kindString } = item;

    //console.log("name:", name);
    //console.log("kindString:", kindString);

    switch (kindString) {
      case "Module":
        return {
          variant: "section",
          title: useTitle(name),
          children: [useData(item)],
        };
      case "Namespace":
      case "Function":
      case "Variable":
        return {
          variant: "item",
          title: useTitle(name),
          children: (
            <Link href={name} passHref>
              <a title={name}>{name}</a>
            </Link>
          ),
        };
      default:
        return null;
    }
  });
}
