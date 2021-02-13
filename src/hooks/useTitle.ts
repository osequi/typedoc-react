import { startCase } from "lodash";

export function useTitle(title: string): string {
  return title.includes("use") ? title : startCase(title);
}
