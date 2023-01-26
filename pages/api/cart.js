import { firebaseURL } from "./auth/signup";

export async function fetchCart(userId) {
  const response = await fetch(`${firebaseURL}/cart/${userId}.json`);
  const data = await response.json();

  const cart = [];
  let totalPrice = 0;
  for (const cartKey in data) {
    cart.push({ cartKey: cartKey, ...data[cartKey] });

    totalPrice += data[cartKey].price * data[cartKey].items;
  }

  return { cart, totalPrice };
}

export default async function handler(req, res) {
  const { cartItems, cartKey, items, product, userId } = req.body;

  if (req.method === "PATCH") {
    await fetch(`${firebaseURL}/cart/${userId}/${cartKey}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: items }),
    });

    res.status(204).end();
  } else if (req.method === "DELETE") {
    await fetch(`${firebaseURL}/cart/${userId}/${cartKey}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(204).end();
  } else if (req.method === "POST") {
    if (!product) {
      const data = await fetchCart(userId);

      res.status(200).json({ cart: data.cart, totalPrice: data.totalPrice });
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

    res.status(200).json({ name: data.name });
  }
}
