const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saveSchema = new Schema({
  save: {
    type : String,
    required : true
  }
});

const SAVE = mongoose.model('save',saveSchema)

module.exports = SAVE