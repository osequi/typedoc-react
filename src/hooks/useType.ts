import { TPageProps } from "../components";
import {
  TData,
  TPageData,
  TTypeAny,
  TTypeReference,
  TTypeIntrinsic,
  TTypeUnion,
  TTypeArray,
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
      const { name: name1 } = type as TTypeReference;
      const reference = useTypeFind(name1, data);
      return {
        name: name1,
        variant: "reference",
        reference: usePage({ data: data, pageData: reference }),
      };
    case "intrinsic":
      const { name: name2 } = type as TTypeIntrinsic;
      return { name: name2, variant: "value" };
    case "reflection":
      return {
        name: "Type literal must be handled in useProps",
        variant: "value",
      };
    case "union":
      const { types } = type as TTypeUnion;
      return {
        name: types.map((item) => useReference(item, data).name).join("|"),
        variant: "array",
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
