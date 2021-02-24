import { TPageData } from ".";

export function useRequired(item: TPageData): boolean {
  const { flags } = item;
  return !flags?.isOptional;
}
