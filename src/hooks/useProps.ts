export function useProps(props) {
  if (!props?.pageData?.signatures[0]?.parameters) return null;

  const { pageData, data } = props;
  const params = pageData.signatures[0].parameters;
  return useParams(params, data);
}

//// NOTE: this has to be made recursive
function useParams(params, data) {
  console.log("params:", params);
  return params?.map((item) => {
    let { type } = item;
    let { type: type2, name } = type;

    if (type2 === "reference") {
      type.value = useQuery(data, name);
    }

    return { ...item, type: type };
  });
}

//// NOTE: this works fine
function useQuery(data, name) {
  const { children } = data;
  const found = children?.find((item) => item.name === name);
  return found
    ? found
    : children?.reduce((result, item) => {
        return result ? result : useQuery(item, name);
      }, null);
}
