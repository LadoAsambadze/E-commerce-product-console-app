import connect from "./database/mongo.js";
import Order from "./models/order-models.js";
connect();

async function main() {
  const most = await Order.aggregate([
    { $group: { _id: "$productId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  const maxId = most[0]._id;
  const maxCount = most[0].count;

  console.log(`ID "${maxId}" repeats ${maxCount} times.`);
  return maxId;
}

main();
