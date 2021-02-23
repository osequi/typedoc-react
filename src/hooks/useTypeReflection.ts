import { TTypeReflection, TPageData } from ".";

export function useTypeReflection(type: TTypeReflection): TPageData[] {
  const { declaration } = type;
  const { children } = declaration;
  return children;
}
