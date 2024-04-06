const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countSchema = new Schema({
  total: {
    type: String,
    required: true
  },
  totalCat: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  interface: {
    type: String,
    required: true
  },
  animated: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  popcategory: {
    type: String,
    required: true
  }
});

const COUNT = mongoose.model('count', countSchema)

module.exports = COUNT