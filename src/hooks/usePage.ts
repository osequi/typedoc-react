import { flattenDeep, compact } from "lodash";
import { TData } from ".";
import { TStaticPropsParams } from "../pages";

export interface TBaseEntry {
  id: number;
  name: string;
  flags: object;
  comment?: {
    shortText?: string;
  };
}

export interface TModule extends TBaseEntry {
  kindString: "Module";
  children: [];
}

export interface TNamespace extends TBaseEntry {
  kindString: "Namespace";
  children: [];
  groups: [];
}

export interface TVariable extends TBaseEntry {
  kindString: "Variable";
  type: {};
  sources: [];
  defaultValue: string;
}

export interface TInterface extends TBaseEntry {
  kindString: "Interface";
  children?: [];
  sources?: [];
  extendedBy?: [];
  groups?: [];
  extendedTypes?: [];
  typeParameter?: [];
}

export interface TProperty extends TBaseEntry {
  kindString: "Property";
  sources: [];
  type: {};
  inheritedFrom?: {};
}

export interface TTypeLiteral extends TBaseEntry {
  kindString: "Type literal";
  children?: [];
  groups?: [];
  signatures?: [];
}

export interface TTypeAlias extends TBaseEntry {
  kindString: "Type alias";
  sources: [];
  type: [];
}

export interface TTypeParameter extends TBaseEntry {
  kindString: "Type parameter";
}

export interface TFunction extends TBaseEntry {
  kindString: "Function";
  sources: [];
  signatures: [];
}

export interface TCallSignature extends TBaseEntry {
  kindString: "Call signature";
  parameters?: [];
  type: {};
}

export interface TParameter extends TBaseEntry {
  kindString: "Parameter";
  type: {};
  defaultValue?: string;
}

export interface TConstructor extends TBaseEntry {
  kindString: "Constructor";
  signatures: [];
}

export interface TConstructorSignature extends TBaseEntry {
  kindString: "Constructor signature";
  parameters: [];
  type: {};
}

/**
 * From the JSON
 */
export interface TPage {
  name: string;
  kindString: string;
  flags: {};
  comment?: {
    shortText?: string;
  };
  parameters?: TPage[];
  signatures?: TPage[];
  children?: TPage[];
  type?: TType;
  defaultValue: string;
}

export interface TType {
  type: string;
  id?: number;
  name?: string;
  elementType?: TType;
  types?: TType[];
}

/**
 * Returns data for a page.
 * See `getStaticProps` in `[slug].tsx`
 */
export function usePage(data: TData, params: TStaticPropsParams): TPage | null {
  const { children } = data;
  const { slug } = params;

  const found = children?.find((item) => item.name === slug);
  if (found) return found;

  const tryToFind = compact(
    flattenDeep(children?.map((item) => usePage(item, params)))
  ).pop();
  if (tryToFind) return tryToFind;

  // TODO: 'reset' returns null

  //// NOTE: Next.js needs an explicit `null` return type vs `undefined`. `undefined` is returned when the `?:` ternary operator is used instead of `if`s.
  return null;
}
