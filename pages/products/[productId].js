import { getProducts } from "../api/products";
import { firebaseURL, isUserExists } from "../api/auth/signup";

import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/react";

import { Fragment, useState } from "react";

import ProductSummary from "../../components/Product/ProductSummary";

export default function Product(props) {
  const { cart, items, product, userSession, wishlistedKey } = props;

  const [cartItems, setCartItems] = useState(items);
  const [cartKey, setCartKey] = useState(cart);
  const [productKey, setProductKey] = useState(wishlistedKey);

  const wishlistHandler = async () => {
    const user = await isUserExists(userSession.user.email);
    const userId = user[Object.keys(user)[0]].id;

    if (productKey) {
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productKey }),
      });

      setProductKey(null);
      return;
    }

    const response = await fetch(`${firebaseURL}/wishlist/${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
        RAM: product.RAM,
        internal: product.internal,
        release_date: product.release_date,
        images: product.images[0],
      }),
    });
    const data = await response.json();

    setProductKey(data.name);
  };

  const cartHandler = async () => {
    const user = await isUserExists(userSession.user.email);
    const userId = user[Object.keys(user)[0]].id;

    if (cartKey) {
      await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, cartKey, items: cartItems + 1 }),
      });

      setCartItems(cartItems + 1);
      return;
    }

    const response = await fetch(`${firebaseURL}/cart/${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
        images: product.images[0],
        items: cartItems + 1,
      }),
    });
    const data = await response.json();

    setCartItems(cartItems + 1);
    setCartKey(data.name);
  };

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
        <div className={`${userSession ? "pb-20" : "pb-5"} pt-5 px-4`}>
          <article className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-base">{product.name}</h2>
            <p className="font-semibold pt-2 text-base">${product.price}</p>
            <h3 className="font-semibold pt-4 text-center">Specifications</h3>
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
      {userSession && (
        <div className="bg-white bottom-0 fixed flex left-1/2 -translate-x-1/2 max-w-screen-sm mb-0.5 pb-14 pt-2 px-4 w-full sm:rounded-t-md">
          <button
            aria-label={productKey ? "Unwishlist" : "Save to Wishlist"}
            className="flex-shrink-0 px-3"
            onClick={wishlistHandler}
          >
            <Image
              src={`/icons/${productKey ? "wishlisted" : "wishlist"}.svg`}
              alt=""
              width={24}
              height={24}
            />
          </button>
          <button
            className="bg-green-700 ml-2 py-3 rounded-md shadow-sm text-white w-full"
            onClick={cartHandler}
          >
            Add to Cart
          </button>
        </div>
      )}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const productId = context.params.productId;

  const data = getProducts();
  const selected = data.products.find((product) => product.id === productId);

  let cartItems = 0;
  let cartKey;
  let wishlistedKey;

  if (session) {
    const user = await isUserExists(session.user.email);
    const userId = user[Object.keys(user)[0]].id;

    const resWishlist = await fetch(
      `${firebaseURL}/wishlist/${userId}.json?orderBy="productId"&equalTo="${productId}"`
    );
    const wishlisted = await resWishlist.json();
    wishlistedKey = Object.keys(wishlisted)[0];

    const resCart = await fetch(
      `${firebaseURL}/cart/${userId}.json?orderBy="productId"&equalTo="${productId}"`
    );
    const cart = await resCart.json();

    if (Object.keys(cart).length !== 0) {
      cartKey = Object.keys(cart)[0];
      cartItems = cart[cartKey].items;
    }
  }

  return {
    props: {
      cart: cartKey || null,
      items: cartItems,
      product: selected,
      userSession: session,
      wishlistedKey: wishlistedKey || null,
    },
  };
}
