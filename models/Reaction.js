const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => `${new Date(Date.now()).getMonth() + 1}/${new Date(Date.now()).getDate()}/${new Date(Date.now()).getFullYear()}`
    },
    id: false,
  }
);

module.exports = reactionSchema;