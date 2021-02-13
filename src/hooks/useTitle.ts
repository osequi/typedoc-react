import { startCase } from "lodash";
import { TData } from "../components/Template";

export function useTitle(item: TData): string {
  const { name, kindString } = item;

  switch (kindString) {
    case "Module":
      return startCase(name);
    default:
      return name;
  }
}
