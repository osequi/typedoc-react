import { TPageProps } from "../components";
import { TProps } from ".";

export function usePropsType(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  const { type } = normalizedData;
  const { type: typeType, name: typeName } = type;

  switch (typeType) {
    case "reference":
      return useReference(props);
    default:
      return typeName;
  }
}

function useReference(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  const { type } = normalizedData;
  const { name: typeName } = type;

  switch (typeName) {
    case "Element":
      return useElement(props);
    default:
      return typeName;
  }
}

function useElement(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  if (!normalizedData.parameters) return "No props";
}
