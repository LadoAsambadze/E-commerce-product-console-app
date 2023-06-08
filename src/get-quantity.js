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
  const existing = await Purchase.findOne({ productId: response.productId });

  if (existing) {
    console.log(existing.quantity);
  } else {
    console.log("No purchase with this productId");
  }
  process.exit();
}
main();
