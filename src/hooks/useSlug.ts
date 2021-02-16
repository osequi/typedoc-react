import { flattenDeep, compact } from "lodash";
import { TData, TPageData } from ".";
import { TStaticPropsParams } from "../pages";

/**
 * Returns data for a page.
 * See `getStaticProps` in `[slug].tsx`
 */
export function useSlug(
  data: TData,
  params: TStaticPropsParams
): TPageData | null {
  const { children } = data;
  const { slug } = params;

  const found = children?.find((item) => item.name === slug);
  if (found) return found;

  const tryToFind = compact(
    flattenDeep(children?.map((item) => useSlug(item, params)))
  ).pop();
  if (tryToFind) return tryToFind;

  // TODO: 'reset' returns null. There is no entry named 'reset'. The `reset.ts` file should be found and the contents loaded.

  //// NOTE: Next.js needs an explicit `null` return type vs `undefined`. `undefined` is returned when the `?:` ternary operator is used instead of `if`s.
  return null;
}
