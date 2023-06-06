import fs from "fs/promises";
import prompts from "prompts";

async function main() {
  const response = await prompts([
    { type: "text", name: "name", message: "Please enter product name" },
    { type: "text", name: "price", message: "Please enter product price" },
    { type: "text", name: "id", message: "Please enter product name" },
  ]);

  let data;
  try {
    data = JSON.parse(await fs.readFile("ecommerce.json"));
  } catch (error) {
    data = [];
  }

  const index = data.findIndex((item) => item.name === response.name);
  if (index !== -1) {
    data[index].price = response.price;
    data[index].id = response.price;
  } else {
    data.push({
      name: response.name,
      price: response.price,
      id: response.id,
    });
  }
  await fs.writeFile("ecommerce.json", JSON.stringify(data));
}

main();
