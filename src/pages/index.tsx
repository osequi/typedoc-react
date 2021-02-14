import { promises as fs } from "fs";
import path from "path";
import { useJson } from "../hooks";
import { Home, Template } from "../components";

export default function HomePage({ data }) {
  return (
    <Template data={data}>
      <Home />
    </Template>
  );
}

export async function getStaticProps() {
  const data = await useJson("./", "docs.json", fs, path);
  return {
    props: {
      data: data,
    },
  };
}
