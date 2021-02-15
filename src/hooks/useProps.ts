/**
 * The props return type
 */
export interface TProps {
  name: string;
  type: string | TProps;
  defaultValue: string;
  description: string;
  required: boolean;
}

export interface TPropsComponents {}

export function useProps(props): TProps | TProps[] | null {
  const { data, pageData } = props;
  return pageData;
}
