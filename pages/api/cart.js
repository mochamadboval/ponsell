import { firebaseURL } from "./auth/signup";

export default async function handler(req, res) {
  const userId = req.body.userId;
  const cartKey = req.body.cartKey;
  const items = req.body.items;

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
  }
}
