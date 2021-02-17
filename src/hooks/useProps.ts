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
  type: any;
}

export function useProps(props: TPageProps): TProps | TProps[] {
  const { pageData } = props;
  const normalizedPageData = usePropsKindString(pageData);

  return normalizedPageData.map((item) => {
    return {
      name: item.name,
      description: useDescription(item),
      required: useRequired(item),
      defaultValue: useDefaultValue(item),
      type: useType({ ...props, pageData: item }),
    };
  });
}

function usePropsKindString(pageData: TPageData): TPageData[] {
  const { kindString } = pageData;

  switch (kindString) {
    case "Call signature":
      return pageData.parameters;
    default:
      return pageData;
  }
}
