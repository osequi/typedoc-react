import React from "react";
import { TData, TPageData, usePage } from "../../hooks";

export interface TPageProps {
  data: TData;
  pageData: TPageData;
}

export function Page(props: TPageProps) {
  if (!props?.pageData) return <Undefined {...props} />;

  const {
    pageData: { name },
  } = props;
  const page = usePage(props);

  return (
    <div>
      <h1>{name}</h1>
      <p>
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </p>
      <hr />
      <p>
        <pre>{JSON.stringify(props.pageData, null, 2)}</pre>
      </p>
      <hr />
      <p>
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
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
