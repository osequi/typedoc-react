import { TPageProps } from "../components";
import {
  TPageData,
  useDescription,
  useTitle,
  useProps,
  useTypeFind,
  TProps,
  TData,
  TTypeReference,
} from ".";

export interface TPage {
  name: string;
  description: string;
  type: string;
  props: TProps | TProps[];
  raw: any;
}

export function usePage(props: TPageProps): TPage {
  const { pageData, data } = props;
  const normalizedPageData = usePageKindString(pageData);
  const type = usePageType(pageData);
  const propsPageData = usePageData(type, data, normalizedPageData);
  return {
    name: useTitle(pageData),
    description: useDescription(pageData),
    type: type,
    props: useProps({ ...props, pageData: propsPageData }),
    raw: normalizedPageData,
  };
}

// in case of components when they have a single prop it is immediately destuctured
// ie: Image(props: TImage) => the TImage props will be shown
function usePageData(
  type: string,
  data: TData,
  normalizedPageData: TPageData
): TPageData {
  if (type !== "Component") return normalizedPageData;

  const { kindString } = normalizedPageData;
  const props =
    kindString === "Call signature"
      ? normalizedPageData.parameters
      : // A special case for Semantic Elements
      kindString === "Namespace"
      ? normalizedPageData.children
      : null;
  if (!props || props.length > 1) return normalizedPageData;

  // otherwise it should be a reference
  const { type: propType } = props[0];
  const { name, id } = propType as TTypeReference;
  const reference = useTypeFind(id, data);
  return reference ? reference : normalizedPageData;
}

function usePageType(pageData: TPageData): string {
  const { kindString, name } = pageData;

  switch (kindString) {
    case "Variable":
    case "Type alias":
    case "Type literal":
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
