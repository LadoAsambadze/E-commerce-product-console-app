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
  ]);

  const existingPurchase = await Purchase.findOne({
    productId: response.productId,
  });
  const existingOrder = await Order.findOne({
    productId: response.productId,
  });

  if (existingOrder) {
    existingOrder.quantity = response.quantity;
    existingOrder.productId = response.productId;
  } else if (existingPurchase) {
    await Order.create({
      quantity: response.quantity,
      productId: response.productId,
    });
  } else {
    console.log("Product does not exist");
  }
}

main();
