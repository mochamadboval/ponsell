import { fetchCart } from "../api/cart";
import { isUserExists } from "../api/auth/signup";

import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/react";

import { Fragment, useState } from "react";

export default function Cart(props) {
  const { cart, total, userId, userSession } = props;

  const [products, setProducts] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(total);

  const itemsHandler = async (cartKey, currentItems, isAdding) => {
    if (currentItems === 1 && !isAdding) {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, cartKey }),
      });
    } else {
      await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartKey,
          items: isAdding ? currentItems + 1 : currentItems - 1,
        }),
      });
    }

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();

    setProducts(data.cart);
    setTotalPrice(data.totalPrice);
  };

  return (
    <Fragment>
      <Head>
        <title>Cart - Ponsell</title>
        <meta
          name="description"
          content={`Cart of ${userSession.user.name} on Ponsell.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-sm mx-auto pb-20 pt-5 px-4">
        {products.length !== 0 ? (
          <article className="bg-white flex flex-col gap-4 p-4 rounded-md shadow-sm">
            {products.map((product) => (
              <div key={product.productId}>
                <div className="flex gap-4 items-center">
                  <Image
                    src={product.images}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="product-image p-2 rounded-md shadow w-1/4"
                  />
                  <div className="w-3/4">
                    <h2 className="text-base">{product.name}</h2>
                    <p className="font-semibold mt-1 text-base">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-end ml-auto w-3/4">
                  <p className="ml-4 mr-auto text-center">
                    Item: <br />{" "}
                    <span className="font-semibold">{product.items}</span>
                  </p>
                  <button
                    aria-label="Remove one item"
                    className="border border-red-700 p-3 rounded-full"
                    onClick={() =>
                      itemsHandler(product.cartKey, product.items, false)
                    }
                  >
                    <Image
                      src="/icons/remove.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <button
                    aria-label="Add one item"
                    className="border border-green-700 p-3 rounded-full"
                    onClick={() =>
                      itemsHandler(product.cartKey, product.items, true)
                    }
                  >
                    <Image src="/icons/add.svg" alt="" width={24} height={24} />
                  </button>
                </div>
              </div>
            ))}
          </article>
        ) : (
          <p className="text-center w-full">No products.</p>
        )}
      </div>
      {products.length !== 0 && (
        <div className="bg-white bottom-0 fixed flex gap-2 items-center left-1/2 -translate-x-1/2 max-w-screen-sm mb-0.5 pb-14 pt-2 px-4 w-full sm:rounded-t-md">
          <p className="text-center w-1/5">
            Total <br />{" "}
            <span className="font-semibold text-base">${totalPrice}</span>
          </p>
          <button className="bg-green-700 py-3 rounded-md shadow-sm text-white w-full">
            Checkout
          </button>
        </div>
      )}
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

  const data = await fetchCart(userId);

  return {
    props: {
      cart: data.cart,
      total: data.totalPrice,
      userId,
      userSession: session,
    },
  };
}
