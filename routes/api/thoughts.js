const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts - get all thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId - single thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions - reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);


module.exports = router;