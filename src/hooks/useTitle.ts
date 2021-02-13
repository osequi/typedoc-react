import { startCase } from "lodash";

export function useTitle(item): string {
  const { name, kindString } = item;

  switch (kindString) {
    case "Module":
      return startCase(name);
    default:
      return name;
  }
}
