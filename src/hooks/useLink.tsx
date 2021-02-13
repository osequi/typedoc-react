import Link from "next/link";
import { TData } from "../components/Template";
import { useTitle } from ".";

export function useLink(item: TData) {
  const { name } = item;
  const title = useTitle(item);

  return (
    <Link href={name} passHref>
      <a title={title}>{title}</a>
    </Link>
  );
}
