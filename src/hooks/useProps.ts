import { TPageProps } from "../components";
import {
  TPageData,
  TCallSignature,
  TNamespace,
  TVariable,
  TTypeReflection,
  TInterface,
  TType,
  useDescription,
  useType,
  useDefaultValue,
  useRequired,
} from ".";

export interface TProps {
  name: string;
  description: string;
  required: boolean;
  defaultValue: string;
  type: TType;
}

export function useProps(props: TPageProps): TProps | TProps[] {
  const { pageData } = props;
  const normalizedPageData = usePropsKindString(pageData);
  if (!normalizedPageData) return null;

  const normalizedPageDataSorted = sortProps(normalizedPageData);

  return normalizedPageDataSorted.map((item) => {
    return {
      name: item.name,
      description: useDescription(item),
      required: useRequired(item),
      defaultValue: useDefaultValue(item),
      type: useType({ ...props, pageData: item }),
    };
  });
}

function sortProps(pageData: TPageData[]): TPageData[] {
  // see https://www.cloudhadoop.com/typescript-sort-object-array/
  return pageData.sort(
    (a: TPageData, b: TPageData) => 0 - (a.id > b.id ? -1 : 1)
  );
}

function usePropsKindString(pageData: TPageData): TPageData[] {
  const { kindString } = pageData;

  switch (kindString) {
    case "Call signature":
      const { parameters } = pageData as TCallSignature;
      return parameters;
    case "Namespace":
      const { children } = pageData as TNamespace;
      return children;
    case "Interface":
      const { children: children2 } = pageData as TInterface;
      return children2;
    case "Variable":
      const { type } = pageData as TVariable;
      const { type: typeType } = type;

      if (typeType === "reflection") {
        const { declaration } = type as TTypeReflection;
        const { children } = declaration;
        return children;
      } else {
        return [pageData];
      }

    default:
      return null;
  }
}
