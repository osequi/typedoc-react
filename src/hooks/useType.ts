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

export interface TType {
  name: string;
  variant: "value" | "reference" | "array";
  reference?: TPageData;
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
      return {
        name: name1,
        variant: "reference",
        reference: usePage({ data: data, pageData: reference }),
      };
    case "intrinsic":
      const { name: name2 } = type as TTypeIntrinsic;
      return { name: name2, variant: "value" };
    case "reflection":
      console.log({ type });
      const { declaration } = type as TTypeReflection;
      return {
        name: declaration.name,
        variant: "reference",
        reference: usePage({ data: data, pageData: declaration }),
      };
    case "literal":
      const { value } = type as TTypeLiteral2;
      return { name: value, variant: "value" };
    case "union":
      const { types } = type as TTypeUnion;
      return {
        name: types.map((item) => useReference(item, data).name).join("|"),
        variant: "value",
      };
    case "array":
      const { elementType } = type as TTypeArray;
      return {
        //// NOTE: `map` should be used, otherwise we enter an infinite loop
        name: `${[elementType]
          .map((item) => useReference(item, data).name)
          .pop()}[]`,
        variant: "array",
      };
    default:
      return { name: "default", variant: "value" };
  }
}
