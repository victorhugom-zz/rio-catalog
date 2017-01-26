import mongoose from 'mongoose';
import diffHistory from 'mongoose-diff-history/diffHistory';
import uuid from 'uuid';

let ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
  productGroupId: {
    type: String,
    default: uuid.v1
  },
  name: String,
  description: String,
  shortDescription: String,
  originalPrice: Number,
  price: Number,
  brand: String,
  categories: [String],

  stock: {
    type: Number,
    default: 0,
  },

  reference: String,
  sku: String,
  ean: String,
  ncm: String,
  isbn: String,

  height: Number,
  width: Number,
  length: Number,
  weight: Number,
  volume: Number,
  color: {
    "id": String,
    "name": String,
    "hex": String,
    "imageUrl": String
  },
  size: String,

  images: [mongoose.Schema.Types.Mixed],
  videos: [mongoose.Schema.Types.Mixed],
  thumbnailUri: String,

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


// Create db index
ProductSchema.index({
  "name": "text",
  "description": "text",
  "price": "text",
  "brand": "text",
  "categories": "text",
  "sku": "text",
  "color.name": 1,
});

ProductSchema.plugin(diffHistory.plugin);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
