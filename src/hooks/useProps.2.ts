export interface TProps {
  name: string;
  type: string | TProps;
  defaultValue: string;
  description: string;
  required: boolean;
}

export function useProps(props): TProps | TProps[] | null {
  if (!props?.pageData?.signatures[0]?.parameters) return null;

  const { data, pageData } = props;
  const params = pageData.signatures[0].parameters;
  return useParams(params, data);
}

function useParams(params, data) {
  console.log("params:", params);
  return params?.map((item) => useParam(item, data));
}

function useParam(param, data) {
  const { type, name, defaultValue, comment, flags } = param;
  const description = comment ? comment : "";
  const required = flags?.isOptional ? false : true;
  const newType = useType(data, type);

  return {
    name: name,
    type: newType,
    defaultValue: defaultValue,
    description: description,
    required: required,
  };
}

function useType(data, type) {
  const { type: typeType, name: typeName } = type;
  console.log("type:", type);

  switch (typeType) {
    case "reference":
      return { name: typeName, type: useSubType(data, typeName) };
    case "union":
      return {
        name: typeName,
        values: type.types.map((item) => item.value),
      };
    default:
      return typeName;
  }
}

function useSubType(data, name) {
  const { children } = data;
  const found = children?.find((item) => item.name === name);
  console.log("found: ", found);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result
          ? useParams(result.children, data)
          : useSubType(item, name);
      }, null);
}
