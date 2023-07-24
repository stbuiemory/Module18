const { Schema, model } = require('mongoose');
const validator = require('validator');

// User model schema
const userSchema = new Schema (
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: false,
      required: true,
      validate: (function(v) {
        validator.isEmail(v)
      }),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

userSchema.virtual('friendCount').get(function () {
 return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;