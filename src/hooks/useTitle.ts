import { startCase } from "lodash";
import { TData } from ".";

export function useTitle(item: TData): string {
  const { name, kindString } = item;

  switch (kindString) {
    case "Module":
      return startCase(name);
    default:
      return name;
  }
}
