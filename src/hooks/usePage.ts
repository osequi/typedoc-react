import { TPageProps } from "../components";
import {
  TPageData,
  useDescription,
  useTitle,
  useProps,
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
      : kindString === "Namespace"
      ? normalizedPageData.children
      : null;
  if (!props || props.length > 1) return normalizedPageData;

  const { type: propType } = props[0];
  const { name } = propType as TTypeReference;
  const reference = findType(name, data);
  return reference ? reference : normalizedPageData;
}

function findType(name: string, data: TData): TPageData {
  const { children } = data;
  const found = children?.find((item) => item.name === name);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result ? result : findType(name, item);
      }, null);
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
