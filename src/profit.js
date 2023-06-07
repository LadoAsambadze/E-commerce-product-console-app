import connect from "./database/mongo.js";
import Order from "./models/order-models.js";
import Purchase from "./models/purchase-model.js";
import prompts from "prompts";

connect();

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "productId",
      message: "Enter your productId",
    },
  ]);

  const checkId = await Purchase.find({ productId: response.productId });
  const checkId2 = await Order.find({ productId: response.productId });
  const orders = await Order.find({});
  const quantities = orders.map((order) => order.quantity);
  const totalPrices = orders.map(({ price, quantity }) => price * quantity);

  const sumAmount = quantities.reduce((acc, quantity) => acc + quantity, 0);
  const sumPrice = totalPrices.reduce((acc, price) => acc + price, 0);
  const orderAvarage = sumPrice / sumAmount;

  const purchases = await Purchase.find({});
  const quantities2 = purchases.map((purchase) => purchase.quantity);
  const totalPrices2 = purchases.map(({ price, quantity }) => price * quantity);

  const sumAmount2 = quantities2.reduce((acc, quantity) => acc + quantity, 0);
  const sumPrice2 = totalPrices2.reduce((acc, price) => acc + price, 0);
  const purchaseAvarage = sumPrice2 / sumAmount2;

  if (checkId && checkId2) {
    const profit = purchaseAvarage - orderAvarage;
    console.log(profit);
  }
}

main();
