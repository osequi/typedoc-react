import { promises as fs } from "fs";
import path from "path";
import { useJson, usePage, usePaths } from "../hooks";
import { Page, Template } from "../components";

export default function SlugPage({ data, menuData }) {
  return (
    <Template data={menuData}>
      <Page data={data} />
    </Template>
  );
}

export async function getStaticProps({ params }) {
  const data = await useJson("./", "docs.json", fs, path);
  const page = usePage(data, params);
  return {
    props: { data: page, menuData: data },
  };
}

export async function getStaticPaths() {
  const data = await useJson("./", "docs.json", fs, path);
  const paths = usePaths(data);
  return { paths, fallback: false };
}
