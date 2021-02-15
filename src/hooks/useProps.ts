import { TPageProps } from "../components";
import { TPage } from ".";

/**
 * The props return type
 */
export interface TProps {
  name: string;
  type: string | TProps;
  defaultValue: string;
  description: string;
  required: boolean;
}

export function useProps(props: TPageProps): TProps | TProps[] | null {
  const { data, pageData } = props;
  const normalizedData = useNormalized(pageData);
  const { name } = normalizedData;
  return normalizedData;
}

/**
 * Normalize page data.
 * Depending of `kindString` page data is different, but can be normalized to a common shape
 */
function useNormalized(pageData: TPage): TPage {
  const { kindString } = pageData;
  switch (kindString) {
    case "Function":
      return pageData?.signatures?.length ? pageData.signatures[0] : null;
    default:
      return pageData;
  }
}
