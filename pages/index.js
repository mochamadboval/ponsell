import { getProducts, sortProducts } from "./api/products";
import fetchProducts from "../helpers/fetchProducts";

import Head from "next/head";

import { Fragment, useState } from "react";

import LoadMore from "../components/Product/LoadMore";
import ProductItem from "../components/Product/ProductItem";
import SortProducts from "../components/Product/SortProducts";

export default function Home(props) {
  const { initialCount, initialProducts } = props;

  const [products, setProducts] = useState(initialProducts);
  const [selectValue, setSelectValue] = useState("date");
  const [count, setCount] = useState(initialCount);
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  const changeSortHandler = async (event) => {
    const value = event.target.value;
    const data = await fetchProducts(initialCount, value);

    setProducts(data.products);
    setSelectValue(value);
    setCount(initialCount);
    setIsAllLoaded(false);
  };

  const loadMoreHandler = async () => {
    const currentCount = count + initialCount;
    const data = await fetchProducts(currentCount, selectValue);

    setProducts(data.products);
    setCount(currentCount);

    if (data.products.length < currentCount) {
      setIsAllLoaded(true);
    }
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

      <SortProducts selectValue={selectValue} sort={changeSortHandler} />
      <div className="flex flex-wrap gap-4 px-4 py-5">
        {products.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </div>
      <LoadMore isAllLoaded={isAllLoaded} loadMore={loadMoreHandler} />
    </Fragment>
  );
}

export function getStaticProps() {
  const initialCount = 8;

  const products = getProducts();
  const sorted = sortProducts(products, initialCount);

  return {
    props: {
      initialCount,
      initialProducts: sorted,
    },
    revalidate: 10,
  };
}
