import { firebaseURL } from "./auth/signup";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const userId = req.body.userId;
    const productKey = req.body.productKey;

    await fetch(`${firebaseURL}/wishlist/${userId}/${productKey}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(204).end();
  }
}
