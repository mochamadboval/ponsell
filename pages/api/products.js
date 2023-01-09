import fs from "fs";
import path from "path";

export function getProducts() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export function getCategory(data, category) {
  const sortCategory = { products: [] };

  data.products.map((product) => {
    if (
      product.brand.toLowerCase() === category ||
      product.network.toLowerCase() === category
    ) {
      sortCategory.products.push(product);
    }
  });

  return sortCategory;
}

export function sortProducts(data, count, value) {
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
    .map((product, index) => {
      if (index < count) {
        sorted.push({
          id: product.id,
          name: product.name,
          price: product.price,
          RAM: product.RAM,
          internal: product.internal,
          release_date: product.release_date,
          images: product.images[0],
        });
      }
    });

  return sorted;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const value = req.body.value;
    const count = req.body.count;
    const category = req.body.category;

    let products = getProducts();
    if (category) {
      products = getCategory(products, category);
    }

    const sorted = sortProducts(products, count, value);

    res.status(200).json({ products: sorted });
  }
}
