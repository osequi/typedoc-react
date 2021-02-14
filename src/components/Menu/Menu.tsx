import React from "react";
import { useMenu, TData } from "../../hooks";

export interface TMenuItem {
  variant: "section" | "item";
  title: string;
  children: any;
}

export interface TMenu {
  data: TData;
  variant?: "plain" | "folders";
}

export const defaultMenu: TMenu = {
  data: null,
  variant: "folders",
};

export function Menu(props: TMenu) {
  const menu = useMenu(props);
  return <nav>{menu}</nav>;
}

Menu.defaultProps = defaultMenu;
