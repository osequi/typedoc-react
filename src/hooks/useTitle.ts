import { startCase } from "lodash";
import { TData } from ".";

/**
 * Titleizes an entry in the menu.
 * @param  item [description]
 * @return      [description]
 */
export function useTitle(item: TData): string {
  const { name, kindString } = item;

  switch (kindString) {
    case "Module":
    case "Variable":
      return startCase(name);
    default:
      return name;
  }
}
