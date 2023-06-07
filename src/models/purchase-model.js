import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
  quantity: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.String,
    required: true,
  },
  productId: {
    type: Schema.Types.String,
    required: true,
  },
});

const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
