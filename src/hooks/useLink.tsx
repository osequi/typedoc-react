import Link from "next/link";
import { useTitle } from ".";

export function useLink(item) {
  const { name } = item;
  const title = useTitle(item);

  return (
    <Link href={name} passHref>
      <a title={title}>{title}</a>
    </Link>
  );
}
