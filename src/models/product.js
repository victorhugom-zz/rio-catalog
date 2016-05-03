import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
  productGroupId: String,
  name: String,
  description: String,
  shortDescription: String,
  originalPrice: Number,
  price: Number,
  brand: String,
  categories: [String],
  
  reference: String,
  sku: String,
  ean: String,
  ncm: String,
  isbn: String,
    
  height: Number,
  length: Number,
  width: Number,
  weight: Number,
  volume: Number,
  color: String,
  
  images: [String],
  thumbnailUri: String,
  videos: [String],
  
  otherCharacteristics: mongoose.Schema.Types.Mixed,
  available: Boolean,
  composition: [{
    id: {
      type: ObjectId,
      ref: 'Product'
    },
    name: String,
    quantity: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
