import { promises as fs } from "fs";
import path from "path";
import { useJson, useSlug, usePaths, TPageData } from "../hooks";
import { Page, Template } from "../components";

export interface TStaticPropsParams {
  slug: string;
}

export default function SlugPage({ data, pageData }) {
  return (
    <Template data={data}>
      <Page data={data} pageData={pageData} />
    </Template>
  );
}

export async function getStaticProps({ params }) {
  const data = await useJson("./", "docs.json", fs, path);
  const page: TPageData = useSlug(data, params);
  return {
    props: { data: data, pageData: page },
  };
}

export async function getStaticPaths() {
  const data = await useJson("./", "docs.json", fs, path);
  const paths = usePaths(data);
  return { paths, fallback: false };
}
