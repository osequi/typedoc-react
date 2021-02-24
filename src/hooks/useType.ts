import { TPageProps } from "../components";
import {
  TData,
  TPageData,
  TTypeAny,
  TTypeReference,
  TTypeIntrinsic,
  TTypeUnion,
  TTypeArray,
  TTypeLiteral2,
  TTypeReflection,
  useTypeFind,
  usePage,
} from ".";
import { uniqBy } from "lodash";

export interface TType {
  name: string;
  variant: "value" | "reference" | "array";
  references?: TPageData[];
}

export function useType(props: TPageProps): TType {
  const { pageData, data } = props;
  const { type } = pageData;
  return useReference(type, data);
}

function useReference(type: TTypeAny, data: TData): TType {
  if (!type) return null;
  const { type: typeType } = type;

  switch (typeType) {
    case "reference":
      const { name: name1, id: id1 } = type as TTypeReference;
      const reference = useTypeFind(id1, data);
      return reference
        ? {
            name: name1,
            variant: "reference",
            references: [usePage({ data: data, pageData: reference })],
          }
        : {
            name: name1,
            variant: "value",
          };

    case "intrinsic":
      const { name: name2 } = type as TTypeIntrinsic;
      return { name: name2, variant: "value" };
    case "reflection":
      const { declaration } = type as TTypeReflection;
      return declaration
        ? {
            name: declaration.name,
            variant: "reference",
            references: [usePage({ data: data, pageData: declaration })],
          }
        : {
            name: declaration.name,
            variant: "value",
          };
    case "literal":
      const { value } = type as TTypeLiteral2;
      return { name: value, variant: "value" };
    case "union":
      const { types } = type as TTypeUnion;
      const result = types.map((item) => useReference(item, data));
      const names = result.map((item) => item.name).join("|");
      const references = result.map((item) => item.references);
      const referencesUnique = uniqBy(references, "name");
      return referencesUnique
        ? {
            name: names,
            variant: "reference",
            references: referencesUnique,
          }
        : {
            name: names,
            variant: "value",
          };

    case "array":
      const { elementType } = type as TTypeArray;
      //// NOTE: `map` should be used, otherwise we enter an infinite loop
      const element = [elementType]
        .map((item) => useReference(item, data))
        .pop();
      return {
        ...element,
        name: `${element.name}[]`,
      };
    default:
      return { name: "default", variant: "value" };
  }
}
