import { firebaseURL } from "./auth/signup";

export default async function handler(req, res) {
  const { product, productKey, userId } = req.body;

  if (req.method === "DELETE") {
    await fetch(`${firebaseURL}/wishlist/${userId}/${productKey}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(204).end();
  } else if (req.method === "POST") {
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

    res.status(200).json({ name: data.name });
  }
}
