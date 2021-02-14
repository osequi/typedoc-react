import React from "react";
import { TData, useProps } from "../../hooks";

export function Page(props) {
  const { data, pageData } = props;
  console.log("data:", data);
  const { name } = pageData;
  const pageProps = useProps(props);

  return (
    <div>
      <h1>{name}</h1>
      <p>{JSON.stringify(pageProps)}</p>
    </div>
  );
}
