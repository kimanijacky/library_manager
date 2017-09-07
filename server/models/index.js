const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  available: Boolean,
  count: String
});

module.exports = mongoose.model('Books', BookSchema);
