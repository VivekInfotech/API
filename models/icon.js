const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const iconSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  regular: {
    type: String,
    required: true
  },
  bold: {
    type: String,
    required: true
  },
  thin: {
    type: String,
    required: true
  },
  solid: {
    type: String,
    required: true
  },
  straight: {
    type: String,
    required: true
  },
  rounded: {
    type: String,
    required: true
  }
});

const ICON = mongoose.model('icon', iconSchema)

module.exports = ICON