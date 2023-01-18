import { firebaseURL, isUserExists } from "../api/auth/signup";

import Head from "next/head";
import { getSession } from "next-auth/react";

import { Fragment } from "react";

import ProductItem from "../../components/Product/ProductItem";

export default function Wishlist(props) {
  const { products, user } = props;

  return (
    <Fragment>
      <Head>
        <title>Wishlist - Ponsell</title>
        <meta
          name="description"
          content={`Wishlist of ${user.name} on Ponsell.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-wrap gap-4 px-4 py-5">
        {products.length !== 0 ? (
          products.map((product, index) => (
            <ProductItem
              key={product.productId}
              product={product}
              index={index}
            />
          ))
        ) : (
          <p className="text-center w-full">No products.</p>
        )}
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  const user = await isUserExists(session.user.email);
  const userId = user[Object.keys(user)[0]].id;

  const response = await fetch(`${firebaseURL}/wishlist/${userId}.json`);
  const data = await response.json();

  const wishlisted = [];
  for (const productKey in data) {
    wishlisted.unshift(data[productKey]);
  }

  return {
    props: { products: wishlisted, user: session.user },
  };
}
