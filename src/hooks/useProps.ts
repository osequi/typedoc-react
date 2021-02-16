import { TPageProps } from "../components";
import {
  TPageData,
  useDescription,
  useType,
  useDefaultValue,
  useRequired,
} from ".";

export interface TProps {
  name: string;
  description: string;
  required: boolean;
  defaultValue: string;
  type: string | TProps;
}

export function useProps(props: TPageProps): TProps | TProps[] {
  const { pageData } = props;
  const normalizedPageData = usePropsKindString(pageData);

  const result = {
    name: normalizedPageData.name,
    description: useDescription(normalizedPageData),
    required: useRequired(normalizedPageData),
    defaultValue: useDefaultValue(normalizedPageData),
    type: useType({ ...props, pageData: normalizedPageData }),
  };

  return normalizedPageData;
}

function usePropsKindString(pageData: TPageData): TPageData {
  const { kindString } = pageData;

  switch (kindString) {
    case "Call signature":
      return pageData.parameters;
    default:
      return pageData;
  }
}
