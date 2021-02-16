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
  children: TNamespace[] | TInterface[];
}

export interface TNamespace extends TBaseEntry {
  kindString: "Namespace";
  children: TVariable[];
  groups: [];
}

export interface TVariable extends TBaseEntry {
  kindString: "Variable";
  type: {};
  sources: [];
  defaultValue?: string;
}

export interface TInterface extends TBaseEntry {
  kindString: "Interface";
  children?: TProperty[];
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
  children?: TProperty[];
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
  signatures: TCallSignature[];
}

export interface TCallSignature extends TBaseEntry {
  kindString: "Call signature";
  parameters?: TParameter[];
  type: {};
}

export interface TParameter extends TBaseEntry {
  kindString: "Parameter";
  type: {};
  defaultValue?: string;
}

export interface TConstructor extends TBaseEntry {
  kindString: "Constructor";
  signatures: TConstructorSignature[];
}

export interface TConstructorSignature extends TBaseEntry {
  kindString: "Constructor signature";
  parameters: TParameter[];
  type: {};
}

export interface TBaseType {
  type: string;
}

export interface TTypeReference extends TBaseType {
  name: string;
  id?: number;
  typeArguments?: [];
}

export interface TTypeIntrinsic extends TBaseType {
  name: string;
}

export interface TTypeArray extends TBaseType {
  elementType: TTypeIntrinsic | TTypeReference;
}

export interface TTypeReflection extends TBaseType {
  declaration: TTypeLiteral2;
}

export interface TTypeUnion extends TBaseType {
  types: (
    | TTypeReference
    | TTypeIntrinsic
    | TTypeArray
    | TTypeReflection
    | TTypeLiteral2
    | TTypeUnknown
  )[];
}

export interface TTypeLiteral2 extends TBaseType {
  value: string;
}

export interface TTypeUnknown extends TBaseType {
  name: string;
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
