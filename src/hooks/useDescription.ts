import { TPageData } from ".";

export function useDescription(item: TPageData): string | null {
  return item?.comment?.shortText ? item.comment.shortText : null;
}
