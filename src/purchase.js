import prompts from "prompts";
import connect from "./database/mongo.js";
import Purchase from "./models/purchase-model.js";
import Product from "./models/product-model.js";
connect();
async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "quantity",
      message: "Please enter product quantity",
    },
    {
      type: "text",
      name: "price",
      message: "Please enter product price",
    },
    {
      type: "text",
      name: "productId",
      message: "Please enter product productId",
    },
  ]);

  const existingProducts = await Product.find({});

  const existingPurchase = await Purchase.find({});
  console.log(existingPurchase);
  const index = existingProducts.findIndex(
    (product) => product.id === response.productId
  );

  if (index !== -1) {
    const newPurchase = new Purchase({
      quantity: response.quantity,
      price: response.price,
      productId: response.productId,
    });
    await newPurchase.save();
    console.log("Product saved to MongoDB!");
  } else {
    console.log("Product ID does not exist");
  }
}

main();
