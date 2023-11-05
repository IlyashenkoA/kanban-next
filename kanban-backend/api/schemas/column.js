const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = ColumnSchema;
