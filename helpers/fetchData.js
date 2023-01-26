import { isUserExists } from "../pages/api/auth/signup";

export async function fetchProducts(initialCount, value, category) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count: initialCount,
      value: value,
      category: category,
    }),
  });
  const data = await response.json();

  return data;
}

export async function fetchUserId(email) {
  const user = await isUserExists(email);
  const userId = user[Object.keys(user)[0]].id;

  return userId;
}
