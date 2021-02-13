import React, { ReactNode } from "react";
import { Menu } from "../";

export interface TData {
  name: string;
  kindString?: string;
  children?: TData[];
  sources: { fileName: string }[];
}

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
  console.log("data:", data);
  const { name } = data;

  return (
    <div>
      <header>
        <h1>{name}</h1>
        <Menu data={data} />
      </header>
      {children}
    </div>
  );
}

Template.defaultProps = defaultProps;
