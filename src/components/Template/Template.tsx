import React, { ReactNode } from "react";
import { Menu } from "../";
import { TData } from "../../hooks";

export interface TTemplate {
  data?: TData;
  children?: ReactNode;
}

const defaultProps: TTemplate = {
  data: null,
  children: null,
};

export function Template(props: TTemplate = defaultProps) {
  const { data, children } = props;
  const { name } = data;

  const style = {
    display: "flex",
    "flex-wrap": "no-wrap",
  };

  return (
    <div style={style}>
      <header style={{ marginRight: "1em" }}>
        <h1>{name}</h1>
        <Menu data={data} />
      </header>
      {children}
    </div>
  );
}

Template.defaultProps = defaultProps;
