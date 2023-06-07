import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
  },
  productId: {
    type: Schema.Types.String,
    required: true,
  },
});

const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
