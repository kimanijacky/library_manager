const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true
  },
  count: String
});

module.exports = mongoose.model('Books', BookSchema);
