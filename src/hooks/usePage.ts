import { flattenDeep, compact } from "lodash";
import { TData } from ".";

/**
 * Returns data for a page.
 * See `getStaticProps` in `[slug].tsx`
 */
export function usePage(data: TData[], params) {
  const { children } = data;
  const { slug } = params;

  const components = children.find((item) => item.name === "components");
  const tokens = children.find((item) => item.name === "tokens");

  return usePageTokens(tokens, slug) || usePageComponents(components, slug);
}

function usePageTokens(tokens, slug) {
  const { children } = tokens;
  return children?.find((item) => item.name === slug);
}

function usePageComponents(components, slug) {
  const { children, categories } = components;

  const rawData = categories?.map((item) => {
    const { children: childrenOfACategory } = item;

    return childrenOfACategory.map((id) => {
      const entry = children.find((item) => item.id === id);
      return entry?.name === slug ? entry : null;
    });
  });

  return compact(flattenDeep(rawData)).pop();
}
