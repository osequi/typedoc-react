import React from "react";
import { TData, useProps } from "../../hooks";

export function Page(props) {
  const {
    pageData: { name },
  } = props;
  const pageProps = useProps(props);

  return (
    <div>
      <h1>{name}</h1>
      <p>
        <pre>{JSON.stringify(pageProps, null, 2)}</pre>
      </p>
    </div>
  );
}
