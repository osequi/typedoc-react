import { TData, TPageData } from ".";

export function useTypeFind(name: string, data: TData): TPageData {
  const { children } = data;
  const found = children?.find((item) => item.name === name);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result ? result : useTypeFind(name, item);
      }, null);
}
