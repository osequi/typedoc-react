import React from "react";
import { TData, TPage, TProps, useProps } from "../../hooks";

export interface TPageProps {
  data: TData;
  pageData: TPage;
}

export function Page(props: TPageProps) {
  const {
    pageData: { name },
  } = props;
  const pageProps: TProps = useProps(props);

  return (
    <div>
      <h1>{name}</h1>
      <p>
        <pre>{JSON.stringify(pageProps, null, 2)}</pre>
      </p>
    </div>
  );
}
