const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const iconSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  }
});

const ICON = mongoose.model('icon', iconSchema)

module.exports = ICON