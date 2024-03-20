const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popularIconSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type : String,
    required : true
  },
  tag: {
    type : String,
    required : true
  },
  icon: {
    type : String,
    required : true
  }
});

const POPULAR = mongoose.model('popularIcon',popularIconSchema)

module.exports = POPULAR