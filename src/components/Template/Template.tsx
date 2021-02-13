import React, { ReactNode } from "react";
import { Menu } from "../";

export interface TTemplate {
  data?: [];
  children?: ReactNode;
}

const defaultProps: TTemplate = {
  data: null,
  children: null,
};

export function Template(props: TTemplate = defaultProps) {
  const { data, children } = props;
  console.log("data:", data);

  return (
    <div>
      <header>
        <h1>Title</h1>
        <Menu data={data} />
      </header>
      {children}
    </div>
  );
}

Template.defaultProps = defaultProps;
