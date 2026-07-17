const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  propertyType: { type: String },
  description: { type: String },
  city: { type: String },
  district: { type: String },
  address: { type: String },
  area: { type: Number },
  bedrooms: { type: String },
  bathrooms: { type: String },
  parking: { type: String },
  price: { type: Number, required: true },
  priceUnit: { type: String, default: 'month' },
  contactName: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
