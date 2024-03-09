const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const populateSchema = new Schema({
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

const POPULATE = mongoose.model('populate',populateSchema)

module.exports = POPULATE