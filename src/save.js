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

  const existingProduct = await Product.findOne({ id: response.id });

  if (existingProduct) {
    existingProduct.price = response.price;
    existingProduct.name = response.name;
    await existingProduct.save();
    console.log("Product updated on MongoDB!");
  } else {
    await Product.create({
      name: response.name,
      price: response.price,
      id: response.id,
    });
    console.log("Product saved to MongoDB!");
  }
  process.exit();
}

main();
