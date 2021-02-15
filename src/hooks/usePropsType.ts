import { TPageProps } from "../components";
import { TProps, TType, TData, useProps } from ".";

export function usePropsType(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  const { type } = normalizedData;
  const { type: typeType, name: typeName } = type;

  switch (typeType) {
    case "reference":
      return useReference(props);
    case "Interface":
      return useInterface(props);
    default:
      return typeName;
  }
}

function useInterface(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  if (!normalizedData?.children) return "No props";

  return normalizedData?.children?.map((item) =>
    useProps({ ...props, pageData: item })
  );
}

function useReference(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  const { type } = normalizedData;
  const { name: typeName } = type;

  switch (typeName) {
    case "Element":
      return useParameters(props);
    default:
      return useType(props.data, type);
  }
}

/**
 * Returns types from `types`
 */
function useType(data: TData, type: TType): TProps | string {
  if (!type?.id) return type.name;

  const found = findType(data, type?.name);
  return found ? useProps({ data: data, pageData: found }) : null;
}

function findType(data: TData, name) {
  const { children } = data;
  const found = children?.find((item) => item.name === name);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result ? result : findType(item, name);
      }, null);
}

/**
 * Returns types from `parameters`
 */
function useParameters(props: TPageProps): TProps | string {
  const { pageData: normalizedData } = props;
  if (!normalizedData.parameters) return "No props";

  return normalizedData?.parameters?.map((item) =>
    useProps({ ...props, pageData: item })
  );
}
