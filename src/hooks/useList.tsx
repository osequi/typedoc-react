import { TMenuItem } from "../components/Menu";

export function useList(data: TMenuItem[]) {
  return data.map((item) => {
    const { variant, title, children } = item;
    switch (variant) {
      case "section":
        return (
          <li key={`section-${title}`}>
            <span>{title}</span>
            <ul>{useList(children[0])}</ul>
          </li>
        );
      case "item":
        return <li key={`item-${title}`}>{children}</li>;
    }
  });
}
