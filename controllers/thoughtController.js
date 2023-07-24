const { User, Thought } = require('../models');

module.exports = {
  // Get thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // Get 1 thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
            })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(`Thought created and added to ${req.body.username}!`))
      .catch((err) => res.status(500).json(err));
  },
  // Update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
     
      { id: req.params.id },
      
      { 
        username: req.body.username,
        thoughtText: req.body.thoughtText,
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
  // Delete user and their thoughts
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found' })
          : res.json({ message: 'Thought successfully deleted!' })
    );
  },
  // React to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json('No reaction found with that ID :( '));
  },
};