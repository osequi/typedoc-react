import { TPageData } from ".";

export function useDefaultValue(item: TPageData): any {
  const { defaultValue } = item;
  return defaultValue;
}
