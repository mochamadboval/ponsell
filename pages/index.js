import fs from "fs";
import path from "path";

import Head from "next/head";

import { Fragment } from "react";

import ProductItem from "../components/ProductItem";

export default function Home(props) {
  const { products } = props;

  return (
    <Fragment>
      <Head>
        <title>Ponsell</title>
        <meta
          name="description"
          content="Find phones at affordable prices here."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap gap-4 px-4 py-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
}

export function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  let products = [];

  data.products.map((product) => {
    products.push({
      id: product.id,
      name: product.name,
      price: product.price,
      RAM: product.RAM,
      internal: product.internal,
      images: product.images[0],
    });
  });

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}
