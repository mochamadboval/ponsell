import { getCategory, getProducts, sortProducts } from "../api/products";
import fetchProducts from "../../helpers/fetchProducts";

import Head from "next/head";

import { Fragment, useState } from "react";

import LoadMore from "../../components/Product/LoadMore";
import ProductItem from "../../components/Product/ProductItem";
import SortProducts from "../../components/Product/SortProducts";

export default function Category(props) {
  const { category, initialCount, initialProducts } = props;

  const [products, setProducts] = useState(initialProducts);
  const [selectValue, setSelectValue] = useState("date");
  const [count, setCount] = useState(initialCount);
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const changeSortHandler = async (event) => {
    const value = event.target.value;
    const data = await fetchProducts(initialCount, value, category);

    setProducts(data.products);
    setSelectValue(value);
    setCount(initialCount);
    setIsAllLoaded(false);
  };

  const loadMoreHandler = async () => {
    const currentCount = count + initialCount;
    const data = await fetchProducts(currentCount, selectValue, category);

    setProducts(data.products);
    setCount(currentCount);

    if (data.products.length < currentCount) {
      setIsAllLoaded(true);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>{`${categoryName} - Ponsell`}</title>
        <meta
          name="description"
          content={`${categoryName} phones in Ponsell.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-5 px-4">
        <p className="font-bold text-base text-center">{categoryName}</p>
      </div>
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

export function getStaticProps(context) {
  const category = context.params.category;
  const initialCount = 8;

  const products = getProducts();
  const productsByCategory = getCategory(products, category);
  const sorted = sortProducts(productsByCategory, initialCount);

  return {
    props: {
      category,
      initialCount,
      initialProducts: sorted,
    },
    revalidate: 10,
  };
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "oppo",
        },
      },
      {
        params: {
          category: "samsung",
        },
      },
      {
        params: {
          category: "xiaomi",
        },
      },
      {
        params: {
          category: "4g",
        },
      },
      {
        params: {
          category: "5g",
        },
      },
    ],
    fallback: false,
  };
}
