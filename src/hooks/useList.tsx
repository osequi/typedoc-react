export function useList(data) {
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
