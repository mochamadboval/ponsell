import { getProducts } from "../api/products";

import Head from "next/head";
import Image from "next/image";

import { Fragment } from "react";

import ProductSummary from "../../components/Product/ProductSummary";

export default function Product(props) {
  const { product } = props;

  return (
    <Fragment>
      <Head>
        <title>{`${product.name} - Ponsell`}</title>
        <meta
          name="description"
          content={`${product.name} phone in Ponsell.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-sm mx-auto">
        <figure className="figure-images flex gap-2 overflow-x-auto pt-5 px-4">
          {product.images.map((image, index) => (
            <div
              key={image}
              className="image-box bg-white p-4 rounded-md shadow-sm"
            >
              <Image
                src={image}
                alt={product.name}
                width={512}
                height={512}
                priority={index < 2 ? true : false}
                className="product-image"
              />
            </div>
          ))}
        </figure>
        <div className="pb-20 pt-5 px-4">
          <article className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-base">{product.name}</h2>
            <p className="font-bold pt-2 text-base">${product.price}</p>
            <h3 className="font-bold pt-4 text-center">Specifications</h3>
            <section className="flex flex-wrap gap-2 pt-2">
              <ProductSummary
                icon="dimensions"
                info={product.dimensions}
                title="Dimensions"
              />
              <ProductSummary
                icon="display"
                info={product.display}
                secondInfo={product.resolution}
                title="Display"
              />
              <ProductSummary
                icon="system"
                info={`OS: ${product.OS}`}
                secondInfo={`Chipset: ${product.chipset}`}
                thirdInfo={`GPU: ${product.GPU}`}
                title="System"
                isFullBox={true}
              />
              <ProductSummary
                icon="network"
                info={product.network}
                title="Network"
              />
              <ProductSummary
                icon="ram-internal"
                info={`${product.RAM} / ${product.internal}`}
                title="RAM / Internal"
              />
              <ProductSummary
                icon="camera"
                info={`Main: ${product.main_camera}`}
                secondInfo={`Selfie: ${product.selfie_camera}`}
                title="Camera"
                isFullBox={true}
              />
              <ProductSummary
                icon="battery"
                info={product.battery}
                title="Battery"
              />
              <ProductSummary icon="color" info={product.color} title="Color" />
              <ProductSummary
                icon="release-date"
                info={product.release_date}
                title="Release Date"
                isFullBox={true}
              />
            </section>
          </article>
        </div>
      </div>
      <div className="bg-white bottom-0 fixed flex left-1/2 -translate-x-1/2 max-w-screen-sm mb-0.5 pb-14 pt-2 px-4 w-full sm:rounded-t-md">
        <button className="flex-shrink-0 px-3">
          <Image src={`/icons/wishlist.svg`} alt="" width={24} height={24} />
        </button>
        <button className="bg-green-700 ml-2 py-3 rounded-md shadow-sm text-white w-full">
          Add to Cart
        </button>
      </div>
    </Fragment>
  );
}

export function getStaticProps(context) {
  const productId = context.params.productId;

  const data = getProducts();

  let selected = {};
  data.products.map((product) => {
    if (product.id === productId) {
      selected = product;
    }
  });

  return {
    props: {
      product: selected,
    },
    revalidate: 10,
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
