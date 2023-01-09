export default async function fetchProducts(initialCount, value, category) {
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
