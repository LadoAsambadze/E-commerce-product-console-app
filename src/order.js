import Purchase from "./models/purchase-model.js";
import prompts from "prompts";
import connect from "./database/mongo.js";
import Order from "./models/order-models.js";
import Product from "./models/product-model.js";
connect();

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "quantity",
      required: true,
      message: "Please enter product quantity",
    },
    {
      type: "text",
      name: "productId",
      required: true,
      message: "Please enter product productId",
    },
  ]);

  const existingPurchase = await Purchase.findOne({
    productId: response.productId,
  });
  const lastProduct = await Purchase.find({
    productId: response.productId,
    quantity: { $gt: 0 },
  });
  const lastItem = lastProduct.pop();

  if (existingPurchase && lastItem.quantity >= response.quantity) {
    await Order.create({
      quantity: response.quantity,
      productId: response.productId,
      price: lastItem.price,
    });
    const answer = lastItem.quantity - response.quantity;

    lastItem.quantity = answer;
    await lastItem.save();
    console.log("Done");
  } else {
    console.log("Product does not exist");
  }

  process.exit();
}

main();
