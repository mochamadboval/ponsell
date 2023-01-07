import fs from "fs";
import path from "path";

import Head from "next/head";

import { Fragment } from "react";

import CategoryItem from "../../components/CategoryItem";

export default function Categories(props) {
  const { categories } = props;

  return (
    <Fragment>
      <Head>
        <title>Categories - Ponsell</title>
        <meta
          name="description"
          content="Categories of Ponsell. Browse by brand or network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CategoryItem items={categories.brands} name="Brand" />
      <CategoryItem items={categories.network} name="Network" />
    </Fragment>
  );
}

export function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "categories.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return {
    props: {
      categories: data,
    },
  };
}
