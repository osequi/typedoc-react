import { promises as fs } from "fs";
import path from "path";
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
  const data = await useJson("./", "docs.json", fs, path);
  return {
    props: {
      data: data,
    },
  };
}
