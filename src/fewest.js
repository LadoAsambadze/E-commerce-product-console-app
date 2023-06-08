import connect from "./database/mongo.js";
import Purchase from "./models/purchase-model.js";
connect();

async function main() {
  const least = await Purchase.aggregate([
    { $group: { _id: "$productId", count: { $sum: 1 } } },
    { $sort: { count: 1 } },
    { $limit: 1 },
  ]);

  const minId = least[0]._id;
  const minCount = least[0].count;

  console.log(`ID "${minId}" repeats ${minCount} times.`);
  process.exit();
}

main();
