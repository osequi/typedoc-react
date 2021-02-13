import React from "react";
import { useMenu } from "../../hooks";

export interface TMenuItem {
  variant: "section" | "item";
  title: string;
  children: any;
}

export function Menu(props) {
  const { data } = props;
  const menu = useMenu(data);
  return <nav>{menu}</nav>;
}
