import React from "react";
import { TData, TPage, TProps, useProps } from "../../hooks";

export interface TPageProps {
  data: TData;
  pageData: TPage;
}

export function Page(props: TPageProps) {
  if (!props?.pageData) return <Undefined {...props} />;

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

function Undefined(props: TPageProps) {
  const debug = props?.data ? props.data : {};
  return (
    <div>
      <h1>Undefined</h1>
      <p>Something went wrong ...</p>
      <p>
        <pre>{JSON.stringify(debug, null, 2)}</pre>
      </p>
    </div>
  );
}
