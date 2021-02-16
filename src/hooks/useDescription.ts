import { TPageData } from ".";

export function useDescription(item: TPageData): string | null {
  if (!item?.comment) return null;
  const { comment } = item;

  return comment?.shortText
    ? comment.shortText
    : comment?.text
    ? comment.text
    : null;
}
