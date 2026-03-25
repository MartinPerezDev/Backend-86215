import mongoose from "mongoose";

/*
  {
    _id: "lknjk123141231",
    products: [
      {
        _id: "lknjk12315123",
        product: "kjbmn12314123",
        quantity: 5
      }
    ]
  }
*/
const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number, min: 1 }
      }
    ],
    default: []
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;