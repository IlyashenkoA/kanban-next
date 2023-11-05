const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'board',
      },
    ],
  },
  {
    collection: 'user-next',
  }
);

module.exports = UserSchema;
