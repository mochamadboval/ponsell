import { getProducts, sortProducts } from "./api/products";

import Head from "next/head";

import { Fragment, useState } from "react";

import ProductItem from "../components/ProductItem";

export default function Home(props) {
  const { initialProducts } = props;

  const [products, setProducts] = useState(initialProducts);
  const [selectValue, setSelectValue] = useState("date");

  const changeSortHandler = async (event) => {
    const value = event.target.value;

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    const data = await response.json();

    setProducts(data.products);
    setSelectValue(value);
  };

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

      <div className="flex items-center justify-end px-4 pt-5">
        <p className="mr-2">Sorted by</p>
        <select
          className="bg-white p-2 rounded-md shadow-sm"
          value={selectValue}
          onChange={changeSortHandler}
        >
          <option value="high">Price: High to low</option>
          <option value="low">Price: Low to high</option>
          <option value="date">Release date</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-4 px-4 py-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
}

export function getStaticProps() {
  const products = getProducts();
  const sorted = sortProducts(products);

  return {
    props: {
      initialProducts: sorted,
    },
    revalidate: 10,
  };
}
