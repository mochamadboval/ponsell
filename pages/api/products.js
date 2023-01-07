import fs from "fs";
import path from "path";

export function getProducts() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export function sortProducts(data, value) {
  let sorted = [];

  data.products
    .sort((a, b) => {
      if (value === "high") {
        return b.price - a.price;
      }
      if (value === "low") {
        return a.price - b.price;
      }

      let x = new Date(a.release_date);
      let y = new Date(b.release_date);
      return y - x;
    })
    .map((product) => {
      sorted.push({
        id: product.id,
        name: product.name,
        price: product.price,
        RAM: product.RAM,
        internal: product.internal,
        release_date: product.release_date,
        images: product.images[0],
      });
    });

  return sorted;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const value = req.body.value;

    const products = getProducts();
    const sorted = sortProducts(products, value);

    res.status(200).json({ products: sorted });
  }
}
