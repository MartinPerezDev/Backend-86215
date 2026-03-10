import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  stock: Number,
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;