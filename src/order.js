import Purchase from "./models/purchase-model.js";
import prompts from "prompts";
import connect from "./database/mongo.js";
import Order from "./models/order-models.js";
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
    {
      type: "text",
      name: "price",
      required: true,
      message: "Please enter product Price",
    },
  ]);

  const existingPurchase = await Purchase.findOne({
    productId: response.productId,
  });

  if (existingPurchase) {
    await Order.create({
      quantity: response.quantity,
      productId: response.productId,
      price: response.price,
    });
    console.log("Done");
  } else {
    console.log("Product does not exist");
  }
}

main();
