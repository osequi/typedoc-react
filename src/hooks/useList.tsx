import { TMenuItem } from "../components/Menu";

export function useList(data: TMenuItem[]) {
  console.log("data:", data);
  if (!Array.isArray(data)) return null;

  return data.map((item) => {
    const { variant, title, children } = item;
    switch (variant) {
      case "section":
        return (
          <li key={`section-${title}`}>
            <span>{title}</span>
            <ul>{useList(children)}</ul>
          </li>
        );
      case "item":
        return <li key={`item-${title}`}>{children}</li>;
    }
  });
}
