const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type : String,
    unique : true,
    required : true
  },
  tag: {
    type : String,
    required : true
  },
  description: {
    type : String,
    required : true
  }
});

const CATEGORY = mongoose.model('category',categorySchema)

module.exports = CATEGORY