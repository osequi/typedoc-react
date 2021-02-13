import { Home, Template } from "../components";
import { useJson } from "../hooks";

export default function HomePage({ data }) {
  return (
    <Template data={data}>
      <Home />
    </Template>
  );
}

export async function getStaticProps() {
  const data = await useJson("./", "docs.json");
  return {
    props: {
      data: data,
    },
  };
}
