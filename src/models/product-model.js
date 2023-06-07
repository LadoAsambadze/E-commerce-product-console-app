import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.String,
    required: true,
  },
  id: {
    type: Schema.Types.String,
    required: true,
  },
});

const Product = model("Product", productSchema);
export default Product;
