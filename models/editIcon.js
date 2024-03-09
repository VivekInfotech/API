const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editIconSchema = new Schema({
  editIcon: {
    type: Array,
    required: true
  }
});

const EDITICON = mongoose.model('editIcon', editIconSchema)

module.exports = EDITICON