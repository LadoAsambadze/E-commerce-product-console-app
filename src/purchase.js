import fs from "fs/promises";
import prompts from "prompts";

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

  let data;

  try {
    data = JSON.parse(await fs.readFile("ecommerce.json"));
  } catch (error) {
    data = {};
  }

  if (data.purchase === undefined) {
    data.purchase = [];
  }

  if (data.products.some((products) => products.id === response.productId)) {
    const index = data.purchase.findIndex(
      (item) => item.productId === response.productId
    );

    if (index !== -1) {
      data.purchase[index].quantity = response.quantity;
      data.purchase[index].price = response.price;
    } else {
      data.purchase.push({
        quantity: response.quantity,
        price: response.price,
        productId: response.productId,
      });
    }
  } else {
    console.log("Invalid productId");
  }

  await fs.writeFile("ecommerce.json", JSON.stringify(data));
}

main();
