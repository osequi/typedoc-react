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
  return params?.map((item) => {
    const { type, name, defaultValue, comment, flags } = item;
    const { type: typeType, name: typeName } = type;
    const newType =
      typeType === "reference" ? useType(data, typeName) : typeName;
    const description = comment ? comment : "";
    const required = flags?.isOptional ? false : true;

    return {
      name: name,
      type: newType,
      defaultValue: defaultValue,
      description: description,
      required: required,
    };
  });
}

function useType(data, name) {
  const { children } = data;
  const found = children?.find((item) => item.name === name);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result ? useParams(result.children, data) : useType(item, name);
      }, null);
}
