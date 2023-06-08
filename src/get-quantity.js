import Purchase from "./models/purchase-model.js";
import connect from "./database/mongo.js";
import prompts from "prompts";
connect();

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "productId",
      message: "Please enter productId",
    },
  ]);
  const existing = await Purchase.find({ productId: response.productId });
  const existingQuantity = existing.map((item) => item.quantity);
  const sum = existingQuantity.reduce((acc, quantity) => acc + quantity, 0);

  if (existing) {
    console.log(sum);
  } else {
    console.log("No purchase with this productId");
  }
  process.exit();
}
main();
