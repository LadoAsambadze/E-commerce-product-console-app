import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  productId: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
});

const Order = model("Order", orderSchema);
export default Order;
