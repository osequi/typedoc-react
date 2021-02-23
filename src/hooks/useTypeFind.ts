import { TData, TPageData } from ".";

export function useTypeFind(id: number, data: TData): TPageData {
  const { children } = data;
  const found = children?.find((item) => item.id === id);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result ? result : useTypeFind(id, item);
      }, null);
}
