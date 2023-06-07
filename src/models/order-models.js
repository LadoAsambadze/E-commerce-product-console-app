import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  quantity: {
    type: Schema.Types.String,
    required: true,
  },
  productId: {
    type: Schema.Types.String,
    required: true,
  },
});

const Order = model("Order", orderSchema);
export default Order;
