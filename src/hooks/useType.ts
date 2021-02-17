import { TPageProps } from "../components";
import { TTypeAny, TTypeReference, TTypeIntrinsic } from ".";

export interface TType {
  name: string;
}

export function useType(props: TPageProps): any {
  const { pageData } = props;
  const { type } = pageData;
  return useReference(type);
}

function useReference(type: TTypeAny): TType {
  const { type: typeType } = type;

  switch (typeType) {
    case "reference":
      const { name: name1 } = type as TTypeReference;
      return { name: name1 };
    case "intrinsic":
      const { name: name2 } = type as TTypeIntrinsic;
      return { name: name2 };
    default:
      return { name: "default" };
  }
}
