const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pngIconSchema = new Schema({
  pngIcon: {
    type: Array,
    required: true
  }
});

const PNGICON = mongoose.model('pngIcon',pngIconSchema)

module.exports = PNGICON