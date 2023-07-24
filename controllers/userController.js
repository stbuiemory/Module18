const { User, Thought } = require('../models');

module.exports = {
  
  getUsers(req, res) {
    User.find()
      .select('-__v')  
      .populate({ path: 'thoughts', select: '-__v' })
      .populate( 'friends', '-__v' )
      .then((users) => res.json(users))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // Find a single thought
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate({ path: 'thoughts', select: '-__v' })
      .populate( 'friends', '-__v' )
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // Make a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
    
      { id: req.params.id},
      
      { username: req.body.username,
        email: req.body.email,
      },
     
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },
  // Delete user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : Thought.deleteMany(
              { username: user.username },
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'User deleted, but no associated thoughts',
            })
          : res.json({ message: 'User and thoughts successfully deleted' })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Add a buddy
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Remove that buddy
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json('No friend found with that ID :('));
  },
};
