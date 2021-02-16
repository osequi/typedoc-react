import { TPageProps } from "../components";
import { TPageData, useDescription, useTitle } from ".";

export interface TProps {
  name: string;
  description: string;
  required: boolean;
  defaultValue: string;
  type: string | TProps;
}

export function useProps(props: TPageProps): TProps | TProps[] {
  const { pageData } = props;
  const normalizedPageData = usePropsKindString(pageData);

  return normalizedPageData;
}

function usePropsKindString(pageData: TPageData): TPageData {
  const { kindString } = pageData;

  switch (kindString) {
    case "Call signature":
      return pageData.parameters;
    default:
      return pageData;
  }
}
