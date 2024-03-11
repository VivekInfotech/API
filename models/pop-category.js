const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popCategorySchema = new Schema({
  card: {
    type : String,
    required : true
  },
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

const POPCATEGORY = mongoose.model('popCategory',popCategorySchema)

module.exports = POPCATEGORY