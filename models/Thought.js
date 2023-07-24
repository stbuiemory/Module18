const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');

// Thought Model Schema
const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: () => `${new Date(Date.now()).getMonth() + 1}/${new Date(Date.now()).getDate()}/${new Date(Date.now()).getFullYear()}`
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

// virtual that retrieves the number of reactions for the thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
 });

 // Creates model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;