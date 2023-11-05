const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  subtasks: [
    {
      type: {
        label: String,
        completed: Boolean,
      },
      require: false,
    },
  ],
  status: {
    type: String,
    require: true,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: 'column',
    required: true,
  },
});

module.exports = TaskSchema;
