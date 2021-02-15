import { flattenDeep, compact } from "lodash";
import { TData } from ".";

/**
 * From [slug].tsx
 */
export interface TPageParams {
  slug: string;
}

export interface TType {
  type: string;
  name?: string;
  elementType?: TType;
  types?: TType[];
}

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

/**
 * Returns data for a page.
 * See `getStaticProps` in `[slug].tsx`
 */
export function usePage(data: TData, params: TPageParams): TPage {
  const { children } = data;
  const { slug } = params;

  const found = children?.find((item) => item.name === slug);
  return found
    ? found
    : compact(
        flattenDeep(children?.map((item) => usePage(item, params)))
      ).pop();
}
