export interface TPageData {
  id: number;
  name: string;
  flags: object;
  kindString?:
    | "Module"
    | "Namespace"
    | "Variable"
    | "Interface"
    | "Property"
    | "Type literal"
    | "Type parameter"
    | "Type alias"
    | "Function"
    | "Call signature"
    | "Parameter"
    | "Constructor"
    | "Constructor signature";
  comment?: {
    shortText?: string;
    text?: string;
  };
  defaultValue?: string;
  children?: TNamespace[] | TInterface[] | TVariable[] | TProperty[];
  signatures?: (TCallSignature | TConstructorSignature)[];
  parameters?: TParameter[];
  type?: TTypeAny;
  groups?: [];
  sources?: [];
  inheritedFrom?: {};
  extendedBy?: [];
  extendedTypes?: [];
  typeParameter?: [];
}

export interface TModule extends TPageData {
  kindString: "Module";
  children: TNamespace[] | TInterface[];
}

export interface TNamespace extends TPageData {
  kindString: "Namespace";
  children: TVariable[];
  groups: [];
}

export interface TVariable extends TPageData {
  kindString: "Variable";
  type: TTypeAny;
  sources: [];
  defaultValue?: string;
}

export interface TInterface extends TPageData {
  kindString: "Interface";
  children?: TProperty[];
  sources?: [];
  extendedBy?: [];
  groups?: [];
  extendedTypes?: [];
  typeParameter?: [];
}

export interface TProperty extends TPageData {
  kindString: "Property";
  sources: [];
  type: TTypeAny;
  inheritedFrom?: {};
}

export interface TTypeLiteral extends TPageData {
  kindString: "Type literal";
  children?: TProperty[];
  groups?: [];
  signatures?: (TCallSignature | TConstructorSignature)[];
}

export interface TTypeAlias extends TPageData {
  kindString: "Type alias";
  sources: [];
  type: TTypeAny;
}

export interface TTypeParameter extends TPageData {
  kindString: "Type parameter";
}

export interface TFunction extends TPageData {
  kindString: "Function";
  sources: [];
  signatures: TCallSignature[];
}

export interface TCallSignature extends TPageData {
  kindString: "Call signature";
  parameters?: TParameter[];
  type: TTypeAny;
}

export interface TParameter extends TPageData {
  kindString: "Parameter";
  type: TTypeAny;
  defaultValue?: string;
}

export interface TConstructor extends TPageData {
  kindString: "Constructor";
  signatures: TConstructorSignature[];
}

export interface TConstructorSignature extends TPageData {
  kindString: "Constructor signature";
  parameters: TParameter[];
  type: TTypeAny;
}

export interface TBaseType {
  type: string;
}

export interface TTypeReference extends TBaseType {
  name: string;
  id?: number;
  typeArguments?: TTypeAny[];
}

export interface TTypeIntrinsic extends TBaseType {
  name: string;
}

export interface TTypeArray extends TBaseType {
  elementType: TTypeIntrinsic | TTypeReference;
}

export interface TTypeReflection extends TBaseType {
  declaration: TTypeLiteral;
}

export interface TTypeUnion extends TBaseType {
  types: (
    | TTypeReference
    | TTypeIntrinsic
    | TTypeArray
    | TTypeReflection
    | TTypeLiteral
    | TTypeUnknown
  )[];
}

export interface TTypeUnknown extends TBaseType {
  name: string;
}

export type TTypeAny =
  | TTypeReference
  | TTypeIntrinsic
  | TTypeArray
  | TTypeReflection
  | TTypeLiteral
  | TTypeUnknown
  | TTypeUnion;
