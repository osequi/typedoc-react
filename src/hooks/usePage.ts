import { TPageProps } from "../components";
import { TPageData, useDescription, useTitle, useProps, TProps } from ".";

export interface TPage {
  name: string;
  description: string;
  type: string;
  props: TProps | TProps[];
}

export function usePage(props: TPageProps): TPage {
  const { pageData } = props;
  const normalizedPageData = usePageKindString(pageData);

  const result = {
    name: useTitle(pageData),
    description: useDescription(pageData),
    type: usePageType(pageData),
    props: useProps({ ...props, pageData: normalizedPageData }),
  };

  return result;
}

function usePageType(pageData: TPageData): string {
  const { kindString, name } = pageData;

  switch (kindString) {
    case "Variable":
      return "Token";
    default:
      return name.includes("use") ? "Token" : "Component";
  }
}

function usePageKindString(pageData: TPageData): TPageData {
  const { kindString } = pageData;

  switch (kindString) {
    case "Function":
      return pageData.signatures[0];
    default:
      return pageData;
  }
}
