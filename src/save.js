import prompts from "prompts";
import connect from "./database/mongo.js";
import Product from "./models/product-model.js";
connect();

async function main() {
  const response = await prompts([
    { type: "text", name: "name", message: "Please enter product name" },
    { type: "text", name: "price", message: "Please enter product price" },
    { type: "text", name: "id", message: "Please enter product ID" },
  ]);

  const existingProducts = await Product.find({});

  const index = existingProducts.findIndex((item) => item.id === response.id);
  if (index !== -1) {
    existingProducts[index].price = response.price;
    existingProducts[index].name = response.name;
    await existingProducts[index].save();
  } else {
    const newProduct = new Product({
      name: response.name,
      price: response.price,
      id: response.id,
    });
    await newProduct.save();
  }
  console.log("Product saved to MongoDB!");
}

main();
