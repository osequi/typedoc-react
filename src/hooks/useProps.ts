import { TPageProps } from "../components";
import {
  TPageData,
  TCallSignature,
  TNamespace,
  TVariable,
  TTypeReflection,
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
  type: any;
}

export function useProps(props: TPageProps): TProps | TProps[] {
  const { pageData } = props;
  const normalizedPageData = usePropsKindString(pageData);

  // no props
  if (!normalizedPageData) return null;

  return normalizedPageData.map((item) => {
    return {
      name: item.name,
      description: useDescription(item),
      required: useRequired(item),
      defaultValue: useDefaultValue(item),
      type: useType({ ...props, pageData: item }),
    };
  });
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
