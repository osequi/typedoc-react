import { TPageProps } from "../components";
import { TPage, usePropsType } from ".";

/**
 * The props return type
 */
export interface TProps {
  name: string;
  description: string;
  required: boolean;
  defaultValue: string;
  type: string | TProps;
}

export function useProps(props: TPageProps): TProps | TProps[] | null {
  const { data, pageData } = props;
  const normalizedData = useNormalized(pageData);
  console.log("normalizedData:", normalizedData);

  return {
    name: normalizedData.name,
    description: useDescription(normalizedData),
    required: useRequired(normalizedData),
    defaultValue: useDefaultValue(normalizedData),
    type: usePropsType({ data: data, pageData: normalizedData }),
  };
}

function useDefaultValue(normalizedData: TPage): string | null {
  return normalizedData?.defaultValue ? normalizedData.defaultValue : null;
}

function useRequired(normalizedData: TPage): boolean {
  return normalizedData?.flags?.isFix;
}

function useDescription(normalizedData: TPage): string | null {
  return normalizedData?.comment?.shortText
    ? normalizedData.comment.shortText
    : null;
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
