import { TPageProps } from "../components";
import {
  TData,
  TTypeAny,
  TTypeReference,
  TTypeIntrinsic,
  TTypeUnion,
  TTypeArray,
} from ".";

export interface TType {
  name: string;
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
      return { name: name1 };
    case "intrinsic":
      const { name: name2 } = type as TTypeIntrinsic;
      return { name: name2 };
    case "reflection":
      return { name: "Type literal must be handled in useProps" };
    case "union":
      const { types } = type as TTypeUnion;
      return {
        name: types.map((item) => useReference(item, data).name).join("|"),
      };
    case "array":
      const { elementType } = type as TTypeArray;
      return {
        //// NOTE: `map` should be used, otherwise we enter an infinite loop
        name: `${[elementType]
          .map((item) => useReference(item, data).name)
          .pop()}[]`,
      };
    default:
      return { name: "default" };
  }
}
