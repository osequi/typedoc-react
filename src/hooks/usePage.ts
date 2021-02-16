import { TPageProps } from "../components";
import { TPageData, useDescription } from ".";

export interface TPage {
  name: string;
  description: string;
}

export function usePage(props: TPageProps): TPage {
  const { pageData } = props;
  const normalizedPageData = usePageKindString(pageData);

  return normalizedPageData;
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
