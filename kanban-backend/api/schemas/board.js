const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnSchema = require('./column');
const TaskSchema = require('./task');

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    columns: {
      type: [ColumnSchema],
      require: false,
    },
    tasks: {
      type: [TaskSchema],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    collection: 'kanban-next',
  }
);

module.exports = BoardSchema;
