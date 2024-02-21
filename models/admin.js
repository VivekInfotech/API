const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type : String,
    unique : true,
    required : true
  },
  password: {
    type : String,
    required : true
  }
});

const ADMIN = mongoose.model('admin',adminSchema)

module.exports = ADMIN