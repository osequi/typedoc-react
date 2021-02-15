import { flattenDeep, compact } from "lodash";
import { TData } from ".";

/**
 * From [slug].tsx
 */
export interface TPageParams {
  slug: string;
}

/**
 * From the JSON
 */
export interface TPage {
  name: string;
  kindString: string;
  flags: {};
  comment?: {
    shortText?: string;
  };
  parameters?: TPage[];
  signatures?: TPage[];
  type?: TType;
  defaultValue: string;
}

export interface TType {
  type: string;
  name?: string;
  elementType?: TType;
  types?: TType[];
}

/**
 * Returns data for a page.
 * See `getStaticProps` in `[slug].tsx`
 */
export function usePage(data: TData, params: TPageParams): TPage | null {
  const { children } = data;
  const { slug } = params;

  const found = children?.find((item) => item.name === slug);
  if (found) return found;

  const tryToFind = compact(
    flattenDeep(children?.map((item) => usePage(item, params)))
  ).pop();
  if (tryToFind) return tryToFind;

  //// NOTE: Next.js needs an explicit `null` return type vs `undefined`. `undefined` is returned when the `?:` ternary operator is used instead of `if`s.
  return null;
}
